<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");

 $pageArgs = [];
 $pageArgs["configs"] = $configs;
 $pageArgs["pageName"] = "Income category";
 $pageArgs["pageTitle"]= "Income category";
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
  <th scope="col">name</th> 
</tr>
</thead>';
$jsGeneratorScript = '
<template  v-for="(expense, index) in data" >
    <tr>
      <td>{{expense.id}}</td>
      <td>{{expense.name}}</td> 
    </tr>
</template>';

require_once (__DIR__."/../_templates/lightList.php");
