<?php 


require_once(__DIR__."/../envConfigs.php");
// this can change based on the site you are using
 
$configs = $envConfigs; 
$configs["navigationItems"] = [["name"=>"Dashboard" ,"url"=>"{$configs["siteUrl"]}/"],
                               ["name"=>"Expenses" ,"url"=>"{$configs["siteUrl"]}/Expenses"],
                               ["name"=>"Incomes" ,"url"=>"{$configs["siteUrl"]}/Incomes"],
                               ["name"=>"Stores" ,"url"=>"{$configs["siteUrl"]}/Merchants"],
                               ["name"=>"Income sources" ,"url"=>"{$configs["siteUrl"]}/IncomeSources"],
                               ["name"=>"Income category" ,"url"=>"{$configs["siteUrl"]}/IncomeCategory"],
                               ["name"=>"Kob holders" ,"url"=>"{$configs["siteUrl"]}/KobHolders"],
                               ["name"=>"Expense category" ,"url"=>"{$configs["siteUrl"]}/ExpenseCategory"]];
