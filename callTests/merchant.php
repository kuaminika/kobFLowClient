
<?php 
   $title = "Merchant";
   require_once (__DIR__."/../_templates/test_header.php");

 
?>

<script>
        let urlSet = {};
        urlSet.getAll =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
        urlSet.add =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=add`;
        urlSet.update = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=update`;
        urlSet.delete = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
        let sourceContext = "Merchant";
       
     </script>
    <div class="btn" onclick="doNextTest()" style="border: 1px solid red;padding:1%;margin-bottom:2%" >click to do next test</div>
    <div class="d-flex">
        
        <div id="fetchResult" class = "json-container  " style="width:45%"></div>
        <div id="log"style="width:45%"></div>
    </div>
</body>
</html>