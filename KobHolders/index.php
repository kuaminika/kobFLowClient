<!doctype html>
<?php 
 require_once(__DIR__."/../_generics/pageIgniter.php");
$pageArgs = [];
$pageArgs["configs"] = $configs;
$pageArgs["pageName"] = "Kob holders";
$pageArgs["pageTitle"]= "Kob holders";
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
 $sourceContext= "KobHolder"?>

<!doctype html>
<html lang="en" data-bs-theme="auto">
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.111.3">
    <title><?php echo $pageTitle ; ?></title>
 
    

<link href="../_clientTools/bootstrap.min.css" rel="stylesheet">

    

    
    <!-- Custom styles for this template -->
    <link href="../_clientTools/dashboard.css" rel="stylesheet">
  </head>
  <body>
 

    
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Kob flows</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="#">Sign out</a>
    </div>
  </div>
</header>

<div class="container-fluid">
  <div class="row">
    <?php  echo $navTmplt->getNavigation($pageName);  ?>
    <?php  require_once (__DIR__."/../_templates/lightList.php");  ?>
  </div>
</div>


    <script src="../_clientTools/app_lightList.js?<?php  echo gettimeofday()["sec"]?>"></script>
    <script>
      let urlSet = {};
        urlSet.getAll =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=<?php echo $sourceContext?>`;
        urlSet.add =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=add&sourceContext=<?php echo $sourceContext?>`;
        urlSet.update = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=update`;
        urlSet.delete = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
    
        app.load({title :"<?php echo $pageTitle ;?>",urlSet:urlSet,sourceContext:"<?php echo $sourceContext?>"})
    </script>  
  </body>
</html>
