<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Expenses";
 $pageArgs["pageTitle"]= "Expenses";
 $pageArgs["jsScriptList"]= ["../_clientTools/currentUser.js?v1","../_clientTools/app.js?v10","app_configs.js","app_expense.js","../_jsWidgets/kChooser.js?v2","../_jsWidgets/kTabNav.js?v2","../_clientTools/postWrap.js"];
 $pageArgs["styleScriptList"]= [ "../_jsWidgets/kNavTab.css","../_jsWidgets/kChooser.css?v3"];
//TODO modify list.php template to react if not all these variables are not provided
$pageHelper =\kuaminika\generics\PageIgniter::Ignite($pageArgs);
$navTmplt= $pageHelper->getNavigation(); // will be used by  /../_templates/list.php
$pageName = $pageHelper->getPageName();
$pageTitle = $pageHelper->getPageTitle();
$cssStyleInclusions = $pageHelper->generateStyles();
$jsScriptsInclusions = $pageHelper->generateJSScriptTags();
$customJsScript = ' app.load({title :"'.$pageTitle.'",currentUser:UserToolService.currentUserTool.getUserInfo(),sourceContext:"Expense",urlSet})';
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
    <tr class="record-tr" v-bind:id=" \'record-\'+   expense.id" @click="\'app.loadRecord(\' +  expense.id  + \')\'" > 
    
      <td>{{expense.categoryName}}</td>
      <td>{{expense.kobHolderName}}</td>
      <td>{{expense.amount}}</td>
      <td>{{expense.createdDate}}</td>
      <td> <div v-bind:id="\'update_\'+expense.id" class="btn btn-small btn-warning">  <i class="fa fa-edit"></i></div> </td>
      <td><div v-bind:id="\'remove_\'+expense.id" class="btn btn-small btn-danger">  <i class="fa fa-remove"></i></div></td>
    </tr>
</template>';
$source = "merchant";



require_once (__DIR__."/../_templates/list.php");
