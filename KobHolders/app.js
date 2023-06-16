function App(args){
   let props = args||{};
    let self = this;

    self.setArgs =(newArgs)=>
    {
        props = newArgs ||{};
        self.title = props.title ||"Title";

    }
    self.setArgs(props);

    let titleHolderId = props.titleHolderId ||"titleHolder";
    
    self.load = (args)=>{

      const { createApp } = Vue

     

        self.setArgs(args);
        let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=KobHolders&requestAction=getAll`;
        fetch(url).then(r=>r.json()).then(wrapped=>wrapped.subject).then(merchants=>{

         console.log(merchants)
          createApp({
            data() {
              return {merchants }
            }
          }).mount("#merhcantList");
        })

    

        let titleHolder = document.getElementById(titleHolderId);
        titleHolder.innerText = self.title;


    }


}


let app = new App();