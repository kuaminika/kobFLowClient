function App(args){
   let props = args||{};
    let self = this;

    self.setArgs =(newArgs)=>
    {
        props = newArgs ||{};
        self.title = props.title ||"Title";

    }


    let titleHolderId = props.titleHolderId ||"titleHolder";
    
    self.load = (args)=>{

      const { createApp } = Vue

     

        self.setArgs(args);
        let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Expense`;
        let urlMerchants = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
        let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=ExpenseCategory`;
        let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;

        fetch(urlCategory).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          
            data.sort((a,b)=>(b.id-a.id)); 
       
            app.choosers.category.setData(data); 
        });
        
        fetch(url).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
              data.sort((a,b)=>(b.id-a.id));
              data.map(d=>{d.createdDate = d.createdDate.split('T')[0]});
              self.expenses = data;
              console.log(data)
                createApp({
                  data() {
                    return {data }
                  }
                }).mount("#data");
        });
        
        fetch(urlKobHolder).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
                data.sort((a,b)=>(b.id-a.id));        
                app.choosers.account.setData(data);       
          });
    
        fetch(urlMerchants).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          data.sort((a,b)=>(b.id-a.id));       
            app.choosers.merchant.setData(data);
        });
        

        let titleHolder = document.getElementById(titleHolderId);
        titleHolder.innerText = self.title;


    }


}


let app = new App();