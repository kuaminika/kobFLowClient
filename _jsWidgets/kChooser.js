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
            let defaultTemplateContent = `<div class="d-flex ">
                                                <label class="control-label col-auto" for="${contextName}">${title}:</label>
                                                <span data-id="-1" class="chosen-${contextName}-name mx-1">None chosen</span>
                                                <div  style="margin-left:auto" class="btn chooserList-hidden hide-btn  p-2 btn-primary py-0">close</div>
                                                <div  style="margin-left:auto" class="btn p-2 show-btn btn-success py-0">open</div>
                                            </div>
                                            <div style="" class="list-wrap chooserList-hidden col-sm-offset-2 border p-2 border-primary border-1  col-sm-12">
                                                <div class="col-sm-12">
                                                    <div class="input-group ">
                                                        <input onkeyup="filterListFor${contextName}()" type="text" class="form-control  py-0" id="${contextName}" placeholder="filter ${contextName} list">                                                    
                                                        <div class="btn  btn-warning py-1" type="button">Select ${contextName}</div>
                                                    </div>
                                                    <label class="control-label col-sm-10"  >Click on chosen ${contextName}:</label>
                                                    <div class="chooserList-${contextName}  list-group"  style="width:100%" id="${contextName}List">                                                
                                                        <template  v-for="(${contextName}, index) in data">
                                                            <div style="width:100%" data-id="{{${contextName}.id}}"  class="list-group-item list-group-item-action py-0">{{${contextName}.name}}</div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>`;

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

            let holderElementid = args.holderElementid;
            let holderElement = document.querySelector(`#${holderElementid}`);
            let initialData = args.data;
            let currentData = initialData;
            let templateAddress = args.templateAddress;
            function init()
            {
                holderElement.innerHTML= defaultTemplateContent;
              let showBtn =   holderElement.querySelector(".show-btn");
              let hideBtn =   holderElement.querySelector(".hide-btn");
              hideBtn.onclick = hideList.bind(self);
                console.log(showBtn);
                console.log(showBtn);
              showBtn.onclick = showList.bind(self);
                console.log(holderElement);
            }
            self.init= init;
            function filterData(entered)
            {
                 currentData = data.filter(el=>(el.name.includes(entered)));
                 feedChooser();
            }
        
            function feedChooser()
            {
                let contextName = args.contextName;
                let data = currentData;
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