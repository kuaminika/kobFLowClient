<?php 

function generateListChooser($args)
{
    //TODO validate args
    $title = $args["title"];
    $contextName = $args["contextName"];
    $id= $args["id"];
   return ' 
   <style>
     
        .chooserList-'.$contextName.' {max-height:200px; overflow:auto}
        .chooserList-'.$contextName.' .list-group-item:hover
        {
            background-color:#5d92c7;
            border: 1px solid #000;
            color:#fff;
        }
        .chooserList-'.$contextName.'-hidden{ display:none}
        .chooserList-'.$contextName.'-shown{ display:block}
        .chooserList-'.$contextName.' .list-group-item {  cursor:pointer; }
        
   </style>
   
   <script>
      function hide'.$contextName.'List()
      { 
        console.log("doing hide")
         let listWrap =  document.querySelector("#'.$id.' .list-wrap");
         let hideBtn =  document.querySelector("#'.$id.' .hide-btn ");
         let showBtn =  document.querySelector("#'.$id.' .show-btn ");

         //hiding hide btn         
         hideBtn.className = hideBtn.className.replace("chooserList-'.$contextName.'-shown","");
         hideBtn.className = hideBtn.className +" chooserList-'.$contextName.'-hidden";
         // hiding the list
         listWrap.className= listWrap.className.replace("chooserList-'.$contextName.'-shown","");        
         listWrap.className= listWrap.className+" chooserList-'.$contextName.'-hidden";
         
         // showing shwo btn        
         showBtn.className= showBtn.className.replace("chooserList-'.$contextName.'-hidden","");
         showBtn.className= showBtn.className+" chooserList-'.$contextName.'-shown";

         console.log(listWrap);
      }

      function filterListFor'.$contextName.'()
      {
        
        app.filterList("'.$contextName.'",event.target.value)
       
      }

      function show'.$contextName.'List()
      { 
        
        let listWrap =  document.querySelector("#'.$id.' .list-wrap");
        let hideBtn =  document.querySelector("#'.$id.' .hide-btn ");
        let showBtn =  document.querySelector("#'.$id.' .show-btn ");;
        
        //hiding show btn         
        showBtn.className = showBtn.className.replace("chooserList-'.$contextName.'-shown","");
        showBtn.className = showBtn.className +" chooserList-'.$contextName.'-hidden";
        // show the list
        listWrap.className= listWrap.className.replace("chooserList-'.$contextName.'-hidden","");        
        listWrap.className= listWrap.className+" chooserList-'.$contextName.'-shown";
        
        // showing hide btn        
        hideBtn.className= hideBtn.className.replace("chooserList-'.$contextName.'-hidden","");
        hideBtn.className= hideBtn.className+" chooserList-'.$contextName.'-shown";
      }
   </script>
   <div class="d-flex ">
        <label class="control-label col-auto" for="'.$contextName.'">'.$title.':</label>
        <span data-id="-1" class="chosen-'.$contextName.'-name mx-1">None chosen</span>
        <div onclick="hide'.$contextName.'List()" style="margin-left:auto" class="btn chooserList-'.$contextName.'-hidden hide-btn  p-2 btn-primary py-0">close</div>
        <div onclick="show'.$contextName.'List()"  style="margin-left:auto" class="btn p-2 show-btn btn-success py-0">open</div>
   </div>
   <div style="" class="list-wrap chooserList-'.$contextName.'-hidden col-sm-offset-2 border p-2 border-primary border-1  col-sm-12">
     <div class="col-sm-12">
        <div class="input-group ">
            <input onkeyup="filterListFor'.$contextName.'()" type="text" class="form-control  py-0" id="'.$contextName.'" placeholder="filter '.$contextName.' list">
            
             <div class="btn  btn-warning py-1" type="button">Select '.$contextName.'</div>
        </div>
        <label class="control-label col-sm-10"  >Click on chosen '.$contextName.':</label>
       <div class="chooserList-'.$contextName.'  list-group"  style="width:100%" id="'.$contextName.'List">
       
           <template  v-for="('.$contextName.', index) in data">
             <div style="width:100%" data-id="{{'.$contextName.'.id}}"  class="list-group-item list-group-item-action py-0">{{'.$contextName.'.name}}</div>
           </template>
       </div>
     </div>
   </div>';
}