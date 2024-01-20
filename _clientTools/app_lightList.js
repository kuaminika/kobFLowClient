function App(args){
   let props = args||{};
   let sourceContext = props.sourceContext;
    let self = this;

    function makeMap(elements)
    {
      self.map = {};
       for(let i = 0; i<elements.length;i++)
       {  
          let el = elements[i];
          self.map[el.id] = el;
       }
    }
    function postWrap(fullURL,data,headerRules)
    {
        console.log("posting:"+fullURL);
       headerRules = headerRules || {  'Content-Type': 'application/json'  };
       
       var promiseResult = new Promise(function(resolve,reject)
       {
    
           reject = reject ||snitchProblem;
           try 
           {					 
    
            return 	fetch(fullURL,
                   {
                     method: 'POST',
                     body: JSON.stringify(data),
                     headers: headerRules
                   })        
                   .then(response => {
                       if (typeof(response) == "object") resolve(response);
                       if(typeof(response)== "string")  resolve(JSON.parse(response));
                   },reject)
           }
           catch(e)
           {
               snitchProblem(e);
           }			
    
       });
    
       
    
       return promiseResult;
    
    }
    self.setArgs =(newArgs)=>
    {
        props = newArgs ||{};
        self.title = props.title ||"Title";

    }
    self.setArgs(props);

    let titleHolderId = props.titleHolderId ||"titleHolder";
    function refreshElementList(elements)
    {
      makeMap(elements);
      elements.sort((a,b)=>b.id-a.id);
      self.elements.value = elements;
    }

    self.updateElement  = ()=>{
      
         let id = event.target.id.split("_")[1];
        let specimen = self.map[id];
        specimen.value = event.target.value;
        let wrap = {payLoad:specimen,sourceContext:props.sourceContext };
        postWrap(props.urlSet.update,wrap)
        .then(r => r.json())
        .then(console.log)
        .then(()=>{return  fetch(props.urlSet.getAll).then(r=>r.json()).then(wrapped=>wrapped.subject)})
        .then(refreshElementList);
        //TODO: we need to notify that update is succesful

    }

    self.deleteElement  =()=>{

      console.log(event.target);
      let id = event.target.id.split("_")[1];
      console.log(id);
      let model = self.map[id];
      let wrap = {payLoad:model, sourceContext:props.sourceContext};
        //TODO: we need to check if there are some FK violations
        postWrap(props.urlSet.delete,wrap)
        .then(r => r.json())
        .then(console.log)
        .then(()=>{return  fetch(props.urlSet.getAll).then(r=>r.json()).then(wrapped=>wrapped.subject)})
        .then(refreshElementList);
    }

    self.addElement=()=>{
      console.log("adding elelent")
      let input_newElementContent_form = document.getElementById("input_newElementContent_form");
      let input_newElementContent = input_newElementContent_form.getElementsByTagName("input")[0];
      let {value} = input_newElementContent;
      // TODO -- elements  validation before add
      console.log(value);
      if(!value) return;

      let addModel =  {   "name": value,    "ownerId": 1    }
      console.log(addModel);
      console.log(props);
       let wrap = {payLoad:addModel, sourceContext:props.sourceContext};
       console.log(wrap);
      postWrap(props.urlSet.add,wrap)
      .then(r => r.json())
      .then(console.log).then(()=>{
        fetch(props.urlSet.getAll).then(r=>r.json()).then(wrapped=>wrapped.subject).then(refreshElementList);
      })
      input_newElementContent.value = "";
    }

    self.load = (args)=>{

      const { createApp, ref } = Vue

      console.log("args",args)

        self.setArgs(args);
        let url = args.urlSet.getAll;
        fetch(url).then(r=>r.json()).then(wrapped=>wrapped.subject).then(elements=>{
            elements.sort((a,b)=>b.id-a.id);
              self.elements  = ref(elements);
              makeMap(elements);
            console.log(elements)
            self.vueComponent = createApp({        
                  data() {
                    return {elements :self.elements}
                  },
                  methods:{
                    sayHi(){
                      console.log("hi");
                    }
                  }
                });
                
            self.vueComponent.mount("#elementsList");
          });   

        let titleHolder = document.getElementById(titleHolderId);
        titleHolder.innerText = self.title;
    }


    

}


let app = new App();