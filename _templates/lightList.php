<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">   
      <h2 id="titleHolder" >Section title</h2>
      <div class="row">
        <div class="col-md-7 border-1 table-responsive">
          <table id="elementsList" class="table table-sm">
            <thead>
              <tr>
                <th style="width:5%"></th>
                <th style="width:5%"></th>
                <th style="width:10%" scope="col">Id # </th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody  >
                
                <tr v-for="(element, index) in elements " >
                  <td> <div v-bind:id="'save_'+element.id" onclick="app.updateElement()" class="btn btn-primary btn-sm py-0"><i v-bind:id="'saveIcon_'+element.id"   class="fa fa-download"></i> </div></td>  
                  <td> <div v-bind:id="'delete_'+element.id"  class="btn btn-danger btn-sm py-0"  onclick="app.deleteElement()" > <i v-bind:id="'deleteIcon_'+element.id"  class="fa fa-remove"></i> </div></td>  
                  <td>{{element.id}}</td>
                  <td> <input style="width:80%" type="text" name="" v-model="element.name" value=""  v-bind:id="'txtBox_'+element.id" >
               </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4 d-md-flex flex-column justify-content-start">
          <div  id="input_newElementContent_form" >
              <input type="text" value="" />
              <div class="btn btn-success" onclick="app.addElement()"> Add</div>
              <div class="invalid-feedback "> error</div>
          </div>
        </div>
      </div>
    </main>