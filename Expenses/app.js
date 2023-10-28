function App(args){
  console.log("given args",args);
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

    function emptyForm()
    {
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");
      form.reset();
      form.isNew.value = "1" ;
      self.choosers.merchant.reset();
      self.choosers.category.reset( );
      self.choosers.account.reset( );

    }

    function fillForm(element)
    {
      
      self.current_record = element;
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");
      let noneToSee = formHolder.querySelector(".none-to-see");
      noneToSee.style.display="none";
    
      form.style.display= "block";
      if(element.isNew == true)
      {
        emptyForm();
        return ;
      }
      console.log("about to fill form with ",element);
      form.isNew.value = "0" ;
      form.amount.value = element.amount;
      form.description.value = element.description;
      form.createdDate.value= element.createdDate;
      self.choosers.merchant.selectFromInput(element.merchantName);
      self.choosers.category.selectFromInput(element.categoryName);
      self.choosers.account.selectFromInput(element.kobHolderName);
      console.log(form,element,form.description);

    }
    self.loadEditForm = (element)=>{
      
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");
      let noneToSee = formHolder.querySelector(".none-to-see");
      self.tabNav.activateTab("edit");
      if(!element)
      {
          form.style.display= "none";
          noneToSee.style.display="block";
          return;
      }

      fillForm(element);

    }

    function editRecord(record)
    {
      let wrap = {payLoad:record,sourceContext:"Expense"};
      let {urlForUpdate,url}= props.urlSet;
      postWrap(urlForUpdate,wrap).then(r => r.json())
      .then(()=>{
        return fetch(url);
      })
      .then(r=>r.json())
      .then(payLoad=>{
        console.log(payLoad)
        refreshData(payLoad.subject);
       

      });

    }

    function addRecord(record)
    {
      let wrap = {payLoad:record,sourceContext:"Expense"};
      let {urlForAdd,url}= props.urlSet;
      postWrap(urlForAdd,wrap).then(r => r.json())  
      .then(payLoad=>{
        console.log(payLoad)
        refreshData(payLoad.subject);
        emptyForm();

      });
    }

    let titleHolderId = props.titleHolderId ||"titleHolder";
    self.loadRecord =(id)=>{
        self.tabNav.activateTab("edit")

        fillForm(self.expenses_map[id]);
    }


    self.doFormSubmit =()=>{
        
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");
      let fd = new FormData(form);
      let formObj = Object.fromEntries(fd.entries());
      formObj.categoryName = self.choosers.category.getChosen().name;
      formObj.categoryId = self.choosers.category.getChosen().id;
      formObj.kobHolderId= self.choosers.account.getChosen().id;
      formObj.kobHolderName = self.choosers.account.getChosen().name;
      formObj.merchantId =  self.choosers.merchant.getChosen().id;
      formObj.merchantName = self.choosers.merchant.getChosen().name;
 
      console.log(formObj);

      if(formObj.isNew==true) 
      {
        addRecord(formObj);
        return;
      }
     
      editRecord(formObj);
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
      fillForm({isNew:true});
    }

    self.load = (args)=>{

      console.log("given args at load:",args);
      const { createApp,ref } = Vue

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