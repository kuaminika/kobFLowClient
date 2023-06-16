<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Expenses";
 $pageArgs["pageTitle"]= "Expenses";
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
  <th scope="col">Merchant  </th>
  <th scope="col">Category</th>
  <th scope="col">Account</th>
  <th scope="col">Amount</th>
  <th scope="col">Date</th>
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(expense, index) in data" >
    <tr>
      <td>{{expense.id}}</td>
      <td>{{expense.description}}</td>
      <td>{{expense.merchantName}}</td>
      <td>{{expense.categoryName}}</td>
      <td>{{expense.kobHolderName}}</td>
      <td>{{expense.amount}}</td>
      <td>{{expense.createdDate}}</td>
    </tr>
</template>';

require_once (__DIR__."/../_templates/list.php");
