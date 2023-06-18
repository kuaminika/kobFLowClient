function App(args){
   let props = args||{};
    let self = this;

    self.setArgs =(newArgs)=>
    {
        props = newArgs ||{};
        self.title = props.title ||"Title";

    }

    self.filterList = (contextName,entered)=>{
      console.log("contextName",contextName,self[contextName],"end")
      let filteringContext = {...self[contextName]};
      console.log(filteringContext);
      let data = filteringContext.data;
      console.log(data,entered);
      filteringContext.data = data.filter(el=>(el.name.includes(entered)));
      chooserFeed(filteringContext)
    }
    self.setArgs(props);

    let titleHolderId = props.titleHolderId ||"titleHolder";
    function chooserFeed(args)
    {
      let contextName = args.contextName;
      let data = args.data;
      let templateAddress = args.templateAddress;

      let template =  document.querySelector(templateAddress);
          
              
      let listGroup = template.parentElement;
      
       const elements = listGroup.getElementsByClassName("chooser-fed");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
      let tmpHolder = document.createElement("div");
      data.forEach(element=>{
          let rowStr = template.innerHTML;
          
          rowStr = rowStr.replace(`{{${contextName}.id}}`,element.id);
          rowStr = rowStr.replace(`{{${contextName}.name}}`,element.name);
          tmpHolder.innerHTML = rowStr;
          let row = tmpHolder.querySelector("div");
          row.className = row.className+ " chooser-fed";
       //   console.log(row);
          listGroup.appendChild(row);
      });

    }
    self.load = (args)=>{

      const { createApp } = Vue

     

        self.setArgs(args);
        let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Expense`;
        let urlMerchants = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
        let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=ExpenseCategory`;
        let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;

        fetch(urlCategory).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          
          data.sort((a,b)=>(b.id-a.id)); 
          console.log(data)
          
          let map = {};
          data.forEach(e=>{map[e.id]=e});
                let contextName = "category";
                let templateAddress = "#categoryField .list-wrap template ";
                self.category = {  contextName,data ,templateAddress };
                chooserFeed(self.category );
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
                console.log(data)
                let map = {};
                 data.forEach(e=>{map[e.id]=e});
                let contextName = "account";
                let templateAddress = "#accountField .list-wrap template ";
                self.account= {  contextName,data ,templateAddress };
                chooserFeed(self.account);
                  
          });
    
        fetch(urlMerchants).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          data.sort((a,b)=>(b.id-a.id));
          console.log(data);
                let map = {};
                 data.forEach(e=>{map[e.id]=e});
                let contextName = "merchant";
                let templateAddress = "#merchantField .list-wrap template ";
                self.merchant= {  contextName,data ,templateAddress,map };
                chooserFeed( self.merchant);
        });
        

        let titleHolder = document.getElementById(titleHolderId);
        titleHolder.innerText = self.title;


    }


}


let app = new App();