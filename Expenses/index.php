<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Expenses";
 $pageArgs["pageTitle"]= "Expenses";
 $pageArgs["jsScriptList"]= ["app.js?v10","../_jsWidgets/kChooser.js?v2","../_jsWidgets/kTabNav.js?v2","../_clientTools/postWrap.js"];
 $pageArgs["styleScriptList"]= [ "../_jsWidgets/kNavTab.css","../_jsWidgets/kChooser.css?v3"];
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
  <th scope="col">Category</th>
  <th scope="col">Kob holder</th>
  <th scope="col">Amount</th>
  <th scope="col">Date</th>
  <th></th>
  <th></th>
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(expense, index) in data" >
    <tr class="expense-tr" v-bind:id=" \'expense-\'+   expense.id" @click="\'app.loadRecord(\' +  expense.id  + \')\'" > 
    
      <td>{{expense.categoryName}}</td>
      <td>{{expense.kobHolderName}}</td>
      <td>{{expense.amount}}</td>
      <td>{{expense.createdDate}}</td>
      <td> <div v-bind:id="\'update_\'+expense.id" class="btn btn-small btn-warning">  <i class="fa fa-edit"></i></div> </td>
      <td><div v-bind:id="\'remove_\'+expense.id" class="btn btn-small btn-danger">  <i class="fa fa-remove"></i></div></td>
    </tr>
</template>';
$form = '
<div class="form-wrap" id="recordForm">
    <div class="nav  nav-tabs">
        <div class="nav-item " name="edit">
          <a class="nav-link " onclick="app.tabNav.activateTab(\'edit\')" href="#">Edit</a>
        </div> 
        <div class="nav-item active" name="add">
          <a class="nav-link active" onclick="app.tabNav.activateTab(\'add\')" href="#">Add</a>
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
