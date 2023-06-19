<?php 
namespace kuaminika\generics;

require_once(__DIR__."/../_generics/configs.php");
require_once(__DIR__."/../_generics/tmplt_nav.php");
require_once(__DIR__."/../_generics/pagehelper.php");

class PageIgniter
{
    public static function  Ignite($args)
    {
        //TODO abstract these arrays (ie args) such that it can handle when key is missing
       $configs = $args["configs"];
       $result = new PageHelper($configs);
       $result->pageName = $args["pageName"];
       $result->pageTitle = $args["pageTitle"];
       $result->navTmplt = new Template_Navigation($configs);
       $result->jsScriptList = array_key_exists("jsScriptList",$args)? $args["jsScriptList"]:[];
       $result->cssScriptList = array_key_exists("styleScriptList",$args)? $args["styleScriptList"]:[];
       return $result;
    }



}