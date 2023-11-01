<?php 
  $showSource = isset($source);

?>

<div class="form-wrap" id="recordForm">
                <div class="nav  nav-tabs">
                    <div class="nav-item " name="edit">
                    <a class="nav-link " onclick="app.loadEditForm()" href="#">Edit</a>
                    </div> 
                    <div class="nav-item active" name="add">
                    <a class="nav-link active" onclick="app.loadAddForm()" href="#">Add</a>
                    </div> 
                </div>
                <div class="none-to-see" style="display:none"> Please click on a record to edit</div>
                <form >
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="description">Description:</label>
                        <div class="col-sm-12">
                        <textarea  class="form-control" name="description"  style="width:100%"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="amount">Amount:</label>
                        <div class="col-sm-12">
                        <input type="text" class="form-control" id="amount" name="amount" placeholder="amount">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="createdDate">Date:</label>
                        <div class="col-sm-12">
                        <input type="text" class="form-control"  id="createdDate" name="createdDate" placeholder="YYYY-MM-DD">
                        </div>
                    </div>
                    <input type="hidden" name="isNew" value="1" />
                    <?php if($showSource){ ?>
                    <div id="merchantField" style="display:<?php echo $source=="merchant"?"block":"none"; ?>" class="form-group mt-1"> </div>
                    <div id="sourceField" style="display:<?php echo $source=="source"?"block":"none"; ?>"  class="form-group mt-1"> </div>
                    <?php }?>
                    <div id="categoryField" class="form-group mt-1"> </div>      
                    <div id="accountField" class="form-group mt-1"> </div>

                    <script>
                        document.addEventListener("DOMContentLoaded", function(){ 
                            // your code goes here
                            let chooser =  app.createChooser({title:"Merchant",contextName:"merchant",holderElementid:"merchantField"});
                            chooser.init();
                            chooser =  app.createChooser({title:"Income source",contextName:"incomeSource",holderElementid:"sourceField"});
                            chooser.init();
                            chooser =  app.createChooser({title:"Category",contextName:"category",holderElementid:"categoryField"});
                            chooser.init();
                            chooser =  app.createChooser({title:"Kob holder",contextName:"account",holderElementid:"accountField"});
                            chooser.init();
                        }, false);
                        
                    </script>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div onclick="app.doFormSubmit()" class="btn submit-btn btn-success">Submit</div>
                        </div>
                    </div>
                </form>
            </div>