<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Incomes";
 $pageArgs["pageTitle"]= "Incomes";
 $pageArgs["jsScriptList"]= ["app.js"];
//TODO modify list.php template to react if not all these variables are not provided
$pageHelper =\kuaminika\generics\PageIgniter::Ignite($pageArgs);
$navTmplt= $pageHelper->getNavigation();
$pageName = $pageHelper->getPageName();
$pageTitle = $pageHelper->getPageTitle();
$jsScriptsInclusions = $pageHelper->generateJSScriptTags();
$customJsScript = ' app.load({title :"'.$pageTitle.'"})';
$generatedThead = '<thead>
<tr>
  <th scope="col">#id</th>
  <th scope="col">Description</th>
  <th scope="col">Source  </th>
  <th scope="col">Category</th>
  <th scope="col">Amount</th>
  <th scope="col">Account</th>
  <th scope="col">Date</th>
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(income, index) in data" >
    <tr>
      <td>{{income.id}}</td>
      <td>{{income.description}}</td>
      <td>{{income.sourceName}}</td>
      <td>{{income.categoryName}}</td>
      <td>{{income.amount}}</td>
      <td>{{income.kobHolderName}}</td>
      <td>{{income.createdDate}}</td>
    </tr>
</template>';

require_once (__DIR__."/../_templates/list.php");
