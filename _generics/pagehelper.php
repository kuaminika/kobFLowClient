<?php 
namespace kuaminika\generics;

require_once(__DIR__."/../_generics/configs.php");
require_once(__DIR__."/../_generics/tmplt_nav.php");


class PageHelper
{
  

    public  function __construct($configs ) {
        $this->configs = $configs;
    }
    public function getPageTitle()
    {
        return $this->pageTitle ;
    }
    public function getPageName()
    {
        return $this->pageName ;
    }
    public function getNavigation()
    {
        return $this->navTmplt;
    }

    public function getScripts()
    {
        return $this->jsScriptList;
    }

    public function generateJSScriptTags()
    {
        $result = "";

        foreach($this->jsScriptList as $scriptName)
        {
            $result.=" <script src='$scriptName'></script>";
        }
        return $result;
    }



}