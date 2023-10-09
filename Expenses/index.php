<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Expenses";
 $pageArgs["pageTitle"]= "Expenses";
 $pageArgs["jsScriptList"]= ["app.js?v8","../_jsWidgets/kChooser.js?v2"];
 $pageArgs["styleScriptList"]= [ "../_jsWidgets/kChooser.css?v3"];
//TODO modify list.php template to react if not all these variables are not provided
$pageHelper =\kuaminika\generics\PageIgniter::Ignite($pageArgs);
$navTmplt= $pageHelper->getNavigation(); // will be used by  /../_templates/list.php
$pageName = $pageHelper->getPageName();
$pageTitle = $pageHelper->getPageTitle();
$cssStyleInclusions = $pageHelper->generateStyles();
$jsScriptsInclusions = $pageHelper->generateJSScriptTags();
$customJsScript = ' app.load({title :"'.$pageTitle.'"})';
$generatedThead = '<thead>
<tr>
  <th scope="col">#id</th>
  <!--<th scope="col">Description</th>-->
  <th scope="col">Merchant  </th>
  <th scope="col">Category</th>
  <th scope="col">Kob holder</th>
  <th scope="col">Amount</th>
  <th scope="col">Date</th>
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(expense, index) in data" >
    <tr>
      <td>{{expense.id}}</td>
     <!-- <td>{{expense.description}}</td>-->
      <td>{{expense.merchantName}}</td>
      <td>{{expense.categoryName}}</td>
      <td>{{expense.kobHolderName}}</td>
      <td>{{expense.amount}}</td>
      <td>{{expense.createdDate}}</td>
    </tr>
</template>';
$form = '
<div class="form-wrap">
    <div class="nav  nav-tabs">
        <div class="nav-item active">
          <a class="nav-link active" href="#">Edit</a>
        </div> 
        <div class="nav-item">
          <a class="nav-link " href="#">Add</a>
        </div> 
    </div>
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
          <input type="text" class="form-control" id="amount" placeholder="amount">
        </div>
      </div>

      <div id="merchantField" class="form-group mt-1"> </div>
      <div id="categoryField" class="form-group mt-1"> </div>      
      <div id="accountField" class="form-group mt-1"> </div>

      <script>
          document.addEventListener("DOMContentLoaded", function(){ 
            // your code goes here
            let chooser =  app.createChooser({title:"Merchant",contextName:"merchant",holderElementid:"merchantField"});
            chooser.init();
            chooser =  app.createChooser({title:"Category",contextName:"category",holderElementid:"categoryField"});
            chooser.init();
            chooser =  app.createChooser({title:"Kob holder",contextName:"account",holderElementid:"accountField"});
            chooser.init();
          }, false);
         
      </script>

      <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">Submit</button>
      </div>
      </div>
    </form>
</div>
';



require_once (__DIR__."/../_templates/list.php");
