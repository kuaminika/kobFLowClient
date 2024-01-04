
<?php 
   $title = "Income";
   require_once (__DIR__."/../_templates/test_header.php");

 
?>

<script>
    const addModel = undefined;
        let urlSet = {};
        const testIds ={ ADD:1, UPDATE:2,ALL:0,DELETE: 3, ADD_APOST : 4}
        urlSet.getAll =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Income`;
        urlSet.add =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=add`;
        urlSet.update = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=update`;
        urlSet.delete = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
        let sourceContext = "Income";
           function getModel (){ return      {                            
                            "description": "added at "+ new Date(),
                            "ownerId": 1,
                            "amount": 3042.81,
                            "sourceId": 1,
                            "sourceName": "Infosys",
                            "createdDate": new Date(),
                            "kobHolderName": "tangerine checking-test1688947123796",
                            "kobHolderId": 6,
                            "categoryId": 1,
                            "categoryName": "paycheck"
                        }}

        tests[testIds.ADD] =  function(){
            url =urlSet.add;
            const specimen = getModel()
            log(`testing adding with  ${sourceContext} name :${JSON.stringify(specimen)}`);
    
            log(`adding :${JSON.stringify(specimen)}`)
            let wrap = {payLoad:specimen,sourceContext};
            postWrap(url,wrap).then(r => r.json()).then(showIt)

        }
        
        tests[testIds.UPDATE] =  function(){
            url =urlSet.update;
            let specimen =  getModel();
            log("testing updating")
            console.log("doing the update . will update any from ",fetchedData, fetchedData.length);
            const randomIndex = Math.floor(Math.random() * fetchedData.length);
            console.log("randomly got an index to get:",randomIndex);
            let before = fetchedData[randomIndex];
            specimen = {...before,...specimen};
            specimen.description = `UPDATED at ${new Date()}- ${specimen.description}`;
            specimen.amount = specimen.amount+1;
            console.log("before, after: ",before,specimen);
            log(`changing description from ${before.description} to ${specimen.description} with id ${specimen.id}`)
            let wrap = {payLoad:specimen,sourceContext };
            postWrap(url,wrap).then(r => r.json()).then(showIt)

        }

        tests[testIds.DELETE] = function(){
            url = urlSet.delete;
            let specimen =  getModel();
            log("testing delete")
            const randomIndex = Math.floor(Math.random() * fetchedData.length);
            console.log("randomly got an index to get:",randomIndex);
            let before = fetchedData[randomIndex];
            specimen = {...before,...specimen};
            specimen.name = `${before.name}`;
            log(`deleting :${JSON.stringify(before)}`)
            let wrap = {payLoad:specimen,sourceContext};
            postWrap(url,wrap).then(r => r.json()).then(showIt)

        }


        tests[testIds.ADD_APOST]= function(){
        url =urlSet.add;
        let specimen = getModel()
        specimen.description = " test with l'apost" + new Date();
        log(`testing adding with appostrophe ${sourceContext} description :${specimen.description}`);
   
        log(`adding :${JSON.stringify(specimen)}`)
        let wrap = {payLoad:specimen,sourceContext};
        postWrap(url,wrap).then(r => r.json()).then(showIt)

    }

     </script>
    <div class="btn" onclick="doNextTest()" style="border: 1px solid red;padding:1%;margin-bottom:2%" >click to do next test</div>
    <div class="d-flex">
        
        <div id="fetchResult" class = "json-container  " style="width:45%"></div>
        <div id="log"style="width:45%"></div>
    </div>
</body>
</html>