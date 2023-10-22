function App(args){
   args= args||{};
   let defaultArgs= {listHolderId :"data",formHolder_id:"recordForm"};
   let props  = {...defaultArgs,...args}
    let self = this;
    self.current_record = {};
    self.setArgs =(newArgs)=>
    {
        props ={...props,...newArgs};
        self.title = props.title ||"Title";

    }

    function fillForm(element)
    {
      let formHolder = document.getElementById(props.formHolder_id);
      let form = formHolder.querySelector("form");

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

    }

    self.load = (args)=>{

      const { createApp } = Vue

     

        self.setArgs(args);
        let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Expense`;
        let urlMerchants = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
        let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=ExpenseCategory`;
        let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;

        self.tabNav = new KTabNav({id:"recordForm"})
      
        console.log(" self.tabNav:", self.tabNav);
        fetch(urlCategory).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          
            data.sort((a,b)=>(b.id-a.id)); 
       
            app.choosers.category.setData(data); 
        });
        
        fetch(url).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
              data.sort((a,b)=>(b.id-a.id));
              data.map(d=>{d.createdDate = d.createdDate.split('T')[0]});
              self.expenses = data;
              self.expenses_map = {};
              console.log(data)
                createApp({
                  data() {
                    return {data }
                  }
                }).mount("#data");
              self.expenses.forEach(element => {
                self.expenses_map[element.id] =element;
              });
                
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