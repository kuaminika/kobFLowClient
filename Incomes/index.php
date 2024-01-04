<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Incomes";
 $pageArgs["pageTitle"]= "Incomes";
 $pageArgs["jsScriptList"]= ["../_clientTools/currentUser.js?v1","../_clientTools/app.js?v14","app_configs.js","app_incomes.js","../_jsWidgets/kChooser.js?v2","../_jsWidgets/kTabNav.js?v2","../_clientTools/postWrap.js"];
 $pageArgs["styleScriptList"]= [ "../_jsWidgets/kNavTab.css","../_jsWidgets/kChooser.css?v3"];
//TODO modify list.php template to react if not all these variables are not provided
$pageHelper =\kuaminika\generics\PageIgniter::Ignite($pageArgs);
$navTmplt= $pageHelper->getNavigation();
$pageName = $pageHelper->getPageName();
$pageTitle = $pageHelper->getPageTitle();
$cssStyleInclusions = $pageHelper->generateStyles();
$jsScriptsInclusions = $pageHelper->generateJSScriptTags();
$customJsScript = ' app.load({title :"'.$pageTitle.'",currentUser:UserToolService.currentUserTool.getUserInfo(),sourceContext:"Income",urlSet})';
$generatedThead = '<thead>
<tr>
 <!-- <th scope="col">#id</th>
  <th scope="col">Description</th>
  <th scope="col">Source  </th>-->
  <th scope="col">Category</th>
  <th scope="col">Amount</th>
  <th scope="col">Account</th>
  <th scope="col">Date</th>
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(income, index) in data" >
    <tr class="record-tr" v-bind:id=" \'record-\'+   income.id">
     <!-- <td>{{income.id}}</td>
      <td>{{income.description}}</td>
      <td>{{income.sourceName}}</td> -->
      <td>{{income.categoryName}}</td>
      <td>{{income.amount}}</td>
      <td>{{income.kobHolderName}}</td>
      <td>{{income.createdDate}}</td>
      <td> <div v-bind:id="\'update_\'+income.id" class="btn btn-small btn-warning">  <i class="fa fa-edit"></i></div> </td>
      <td><div v-bind:id="\'remove_\'+income.id" class="btn btn-small btn-danger">  <i class="fa fa-remove"></i></div></td>
    </tr>
</template>';

$source = "source";
require_once (__DIR__."/../_templates/list.php"); 
