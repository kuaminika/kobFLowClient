function App(args){
   args= args||{};

   //TODO: when i click on add, it still shows old user records
   //TODO: when load, and go to edit tab, it  should show a prompt to click a record if theres none to chosen. 
   let defaultArgs= {listHolderId :"data",formHolder_id:"recordForm"};
   let props  = {...defaultArgs,...args}
    let self = this;
    self.current_record = {};
    self.setArgs =(newArgs)=>
    {
        props ={...props,...newArgs};
        self.title = props.title ||"Title";

    }
    function refreshData(data)
    {
        makeMap(data);
        self.expenses.value =data;
      //  the vue.updated hook will run the loadBtns function
    }
    function makeMap(data)
    {
      data.sort((a,b)=>(b.id-a.id));
      data.map(d=>{d.createdDate = d.createdDate.split('T')[0]});
        self.expenses_map = {};
        data.forEach(element => {
          self.expenses_map[element.id] =element;
        });
    }

    function loadBtns()
    {
      let dataRecords = document.querySelectorAll(`.expense-tr`);
                     
      let n = dataRecords.length;

      for(let i =0;i<n;i++)
      {
          let tb = dataRecords[i];
         // console.log(i);
          if(!tb.id) continue; 
          let id = tb.id.split("-")[1]; 
          
          let btn =  document.getElementById(`update_${id}`);
          let removeBtn = document.getElementById(`remove_${id}`);
          btn.onclick =()=>self.loadRecord(id);
          removeBtn.onclick=()=>self.removeRecord(id);
      }
      console.log("----")
    }


    function fillForm(element)
    {
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");

      if(element.true)
      {
        form.reset();
        self.choosers.merchant.init();
        self.choosers.category.init();
        self.choosers.account.init();
        return ;
      }
      form.amount.value = element.amount;
      form.description.value = element.description;
      self.choosers.merchant.selectFromInput(element.merchantName);
      self.choosers.category.selectFromInput(element.categoryName);
      self.choosers.account.selectFromInput(element.kobHolderName);
      console.log(form,element,form.description);
    }


    let titleHolderId = props.titleHolderId ||"titleHolder";
    self.loadRecord =(id)=>{
        self.tabNav.activateTab("edit")

        fillForm(self.expenses_map[id]);
    }
    self.removeRecord= (id)=>
    {
      console.log(`id to remove is:`,id)

   
      let urlForDelete = props.urlSet.urlForDelete;
      let urlForSelectAll = props.urlSet.url;
      console.log(`looking for ${id} in:`,self.expenses_map);
      let specimen = self.expenses_map[id];
      console.log("found:",specimen);
      let wrap = {payLoad:specimen,sourceContext:"Expense"};
     
      postWrap(urlForDelete,wrap).then(r => r.json())
      .then(()=>{
        return fetch(urlForSelectAll);
      })
      .then(r=>r.json())
      .then(payLoad=>{
        console.log(payLoad)
        refreshData(payLoad.subject);
      });
    }
    self.loadAddForm = ()=>
    {
      self.tabNav.activateTab('add');
      fillForm({new:true});
    }

    self.load = (args)=>{

      const { createApp,ref } = Vue

        let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Expense`;
        let urlMerchants = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
        let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=ExpenseCategory`;
        let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;
        let urlForDelete=  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
        args.urlSet = {url,urlMerchants,urlCategory,urlKobHolder,urlForDelete};
        self.setArgs(args);
        self.tabNav = new KTabNav({id:"recordForm"})

        console.log(" self.tabNav:", self.tabNav);
        fetch(urlCategory).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          
            data.sort((a,b)=>(b.id-a.id)); 
       
            app.choosers.category.setData(data); 
        });
        
        fetch(url).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          makeMap(data);
              self.expenses = ref(data);
              console.log(data)
                createApp({
                  data() {
                    return {data:self.expenses }
                  },
                  updated(){
                  console.log("its updated");
                  console.log("self:",self)
                  loadBtns();
                 },
                  mounted(){
                  console.log("its mounted")
                 }
                }).mount("#data");
                
                loadBtns();


        });
        
        fetch(urlKobHolder).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
                data.sort((a,b)=>(b.id-a.id));        
                app.choosers.account.setData(data);       
          });
    
        fetch(urlMerchants).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          data.sort((a,b)=>(b.id-a.id));       
            app.choosers.merchant.setData(data);
        });
        
        console.log(props)
        let titleHolder = document.getElementById(titleHolderId);
        titleHolder.innerText = self.title;


    }


}


let app = new App();