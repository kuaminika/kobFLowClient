<!doctype html>
<?php 
 require_once(__DIR__."/_generics/pageIgniter.php");
$pageArgs = [];
$pageArgs["configs"] = $configs;
$pageArgs["pageName"] = "Dashboard";
$pageArgs["pageTitle"]= "Dashboard";
$pageArgs["jsScriptList"]= [ ];
//TODO modify list.php template to react if not all these variables are not provided
$pageHelper =\kuaminika\generics\PageIgniter::Ignite($pageArgs);
 $navTmplt= $pageHelper->getNavigation();
 $pageName = $pageHelper->getPageName();
 $pageTitle = $pageHelper->getPageTitle();
 $generatedThead = ' ';
 $jsGeneratorScript = ' ';
 $jsScriptsInclusions = $pageHelper->generateJSScriptTags();
 $customJsScript =  ' ';
 
require_once (__DIR__."/_templates/dashboard.php");