 let appHolder = app || {};
(
    function(app)
    {
        function KChooser(args)
        {
            args = args ||{};
            let self = this;
            let contextName = args.contextName ; 
            let title = args.title;
            let chosen = {id :-1, mame:"None chosen"};
            let holderElementid = args.holderElementid;
            let holderElement = document.querySelector(`#${holderElementid}`);
            let initialData = args.data ||[];
            let currentData = initialData;
            let chooserInput ={};// blank obj for now
         
            
            let map = {};
            initialData.forEach(e=>{map[e.id]=e});
            let defaultTemplateContent = `<div class="d-flex ">
                                                <label class="control-label col-auto" >${title}:</label>
                                                <span data-id="-1" class="chosen-${contextName}-name chosen-placholder mx-1">None chosen</span>
                                                <div  style="margin-left:auto" class="btn chooserList-hidden hide-btn  p-2 btn-primary py-0">close</div>
                                                <div  style="margin-left:auto" class="btn p-2 show-btn btn-success py-0">open</div>
                                            </div>
                                            <div style="" class="list-wrap chooserList-hidden col-sm-offset-2 border p-2 border-primary border-1  col-sm-12">
                                                <div class="col-sm-12">
                                                    <div class="input-group ">
                                                        <input  type="text" class="form-control  py-0" id="${contextName}KChooserInput" placeholder="filter ${contextName} list">                                                    
                                                        <div id="${contextName}Btn"  class="btn  btn-warning py-1" type="button">Select ${contextName}</div>
                                                    </div>
                                                    <label class="control-label col-sm-10"  >Click on chosen ${contextName}:</label>
                                                    <div class="chooserList list-group"  style="width:100%" id="${contextName}List">                                                
                                                        <template  v-for="(${contextName}, index) in data">
                                                            <div style="width:100%" data-id="{{${contextName}.id}}" data-name="{{${contextName}.name}}"   class="list-group-item list-group-item-action py-0">{{${contextName}.name}}</div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>`;
           let quickAddProcedure = (content)=>{ 
            
                let p = new Promise((acc,rej)=>{
                    console.log(`doing default quick add for ${content}`);

                    acc({id:0, name: content})
                
                })

                return p;
            
            
            };
           let doQuickAdd = (content,quickAddDOne)=>{
                quickAddProcedure(content).then(quickAddDOne);
               // quickAddDOne({id:1, name: content});
            };
            self.selectFromInput = selectFromInput;
            function selectFromInput(name)
            {
                let chosen  = initialData.filter(d=>(d.name == name));
                console.log(chosen);

                if(chosen && chosen.length)
                {
                    setChosen(chosen[0]);
                    return;
                }

                doQuickAdd(name,(added)=>{

                    setChosen(added)

                });
            }


            self.setQuickAddProcedure= (fn)=>{ doQuickAdd = fn};
            function select()
            {
                let row = event.target;

                let id = row.getAttribute("data-id");
                let name = row.getAttribute("data-name");

                console.log({id,name});
                setChosen({id,name});
            }

            function setChosen(newChosen)
            {
                chosen = newChosen;
                let chosenHolder =    holderElement.querySelector(`.chosen-${contextName}-name`);
                chosenHolder.innerText = chosen.name;
                chooserInput.value = chosen.name;
                
                // making sure its active;
                let groupItems =  holderElement.getElementsByClassName("list-group-item ");
                for(let i =0 ;i<groupItems.length;i++)
                {
                    let item = groupItems[i];
                   item.className = item.className.replaceAll("active","");   
                   
                    let id = item.getAttribute("data-id");
                    let name = item.getAttribute("data-name");          
                    if(id === chosen.id && name == chosen.name )  
                       item.className+=" active";   
                }



            }
            function showList()
            {
                console.log("showing list")
                let listWrap =  document.querySelector(`#${holderElementid} .list-wrap`);
                let hideBtn =  document.querySelector(`#${holderElementid} .hide-btn `);
                let showBtn =  document.querySelector(`#${holderElementid} .show-btn `);;
                
                //hiding show btn         
                showBtn.className = showBtn.className.replace(`chooserList-shown`,"");
                showBtn.className = showBtn.className +` chooserList-hidden`;
                // show the list
                listWrap.className= listWrap.className.replace(`chooserList-hidden`,"");        
                listWrap.className= listWrap.className+` chooserList-shown`;
                
                // showing hide btn        
                hideBtn.className= hideBtn.className.replace(`chooserList-hidden`,"");
                hideBtn.className= hideBtn.className+` chooserList-shown`;
              
            }

            function hideList()
            {
                console.log("doing hide")
                let listWrap =  document.querySelector(`#${holderElementid} .list-wrap`);
                let hideBtn =  document.querySelector(`#${holderElementid} .hide-btn `);
                let showBtn =  document.querySelector(`#${holderElementid} .show-btn `);;
                
       
                //hiding hide btn         
                hideBtn.className = hideBtn.className.replace("chooserList-shown","");
                hideBtn.className = hideBtn.className +" chooserList-hidden";
                // hiding the list
                listWrap.className= listWrap.className.replace("chooserList-shown","");        
                listWrap.className= listWrap.className+" chooserList-hidden";
                
                // showing shwo btn        
                showBtn.className= showBtn.className.replace("chooserList-hidden","");
                showBtn.className= showBtn.className+" chooserList-shown";
            }
            function init()
            {
                holderElement.innerHTML = defaultTemplateContent;
                let showBtn =   holderElement.querySelector(".show-btn");
                let hideBtn =   holderElement.querySelector(".hide-btn");
                
                chooserBtn = holderElement.querySelector(`#${contextName}Btn`);
                chooserBtn.onclick = ()=>{
               
                    selectFromInput(chooserInput.value);
                        
                }

                chooserInput = holderElement.querySelector(`#${contextName}KChooserInput`);
                chooserInput.onkeyup = ()=>{
                    let entered = event.target.value;
                    filterData.bind(self)(entered);
                }
                hideBtn.onclick = hideList.bind(self);
                showBtn.onclick = showList.bind(self);
            
            }
            self.init= init;
            function filterData(entered)
            {
                console.log("initialData",initialData);
                 currentData = initialData.filter(el=>(el.name.includes(entered)));
                 feedChooser();
            }
            function setData(data)
            {
                data = data ||[];
                initialData.forEach(e=>{map[e.id]=e});
                initialData = data;
                currentData = data;
                console.log("setData",contextName,data);
                feedChooser();
            }
            self.setData = setData;
            function feedChooser()
            {
                let contextName = args.contextName;
                let data = currentData;
                let template =  holderElement.querySelector("template");                       
                let listGroup = template.parentElement;
                
                const elements = listGroup.getElementsByClassName("chooser-fed");
                    while(elements.length > 0){
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                let tmpHolder = document.createElement("div");
                data.forEach(element=>{
                    let rowStr = template.innerHTML;
                    
                    rowStr = rowStr.replaceAll(`{{${contextName}.id}}`,element.id);
                    rowStr = rowStr.replaceAll(`{{${contextName}.name}}`,element.name);
                    tmpHolder.innerHTML = rowStr;
                    let row = tmpHolder.querySelector("div");
                    row.className = row.className+ " chooser-fed";
                    row.onclick = select.bind(self);
                
                    listGroup.appendChild(row);
                });
        
            }

            self.feedChooser = feedChooser;
            self.filterData = filterData;
        
        
        }

        app.createChooser = function(args)
        {
            let result = new KChooser(args);
            app.choosers = app.choosers ||{};

            app.choosers[args.contextName] = result;

            return result;
        }

        console.log(app)

    }




)(appHolder);