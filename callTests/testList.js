
function showIt(it)
{
  let  fetchResult =document.getElementById("fetchResult");
   console.log("it is",it);
  fetchResult.innerText = JSON.stringify(it,null, 2);
}
function log(...args)
{
    let it = args[0];
    console.log(args)
  let  logStage =document.getElementById("log");
  let log = document.createElement("div");
  log.innerText = it;
  log.className = `${log.className} log-message`;
  logStage.append(log);
  const error = new Error();
  const stackLines = error.stack.split('\n');
   
    const lineNumber = stackLines[2].match(/:(\d+):\d+/)[1];
    const fileName = stackLines[1].match(/(\w+\.js)/)[1];
    const logMessage = `<a href="view-source:${window.location.href}">${fileName}:${lineNumber}</a>`;

    console.log(logMessage, ...args, it);
}
function showError(error)
{
    
  let  fetchResult =document.getElementById("fetchResult");
  
}
let url = "";
let currentTest = 0;



let tests = [];

let fetchedData = [];


tests[0]=function(){

    log(`testing fetching all ${sourceContext}s`);
 
     url = urlSet.getAll;
    fetch(url).then(r => r.json())
    .then(d=>{fetchedData = d.subject;
        return fetchedData;
    })
    .then(showIt);
}
tests[1]=function(){
        url = urlSet.add;
        let specimen =   {
            "name":`test${(new Date().getTime())}`, ownerId:1
        }
        log(`adding a ${sourceContext}  with name ${specimen.name}`)
        let wrap = {payLoad:specimen,sourceContext};
       
        postWrap(url,wrap).then(r => r.json()).then(showIt)
    }

    tests[2] = function(){
        url =urlSet.update;
        let specimen =  {
            "name":`test${(new Date().getTime())}`
        }
        log("testing updating")
        console.log("doing the update . will update any from ",fetchedData, fetchedData.length);
        const randomIndex = Math.floor(Math.random() * fetchedData.length);
        console.log("randomly got an index to get:",randomIndex);
        let before = fetchedData[randomIndex];
        specimen = {...before,...specimen};
        specimen.name = `${before.name}-${specimen.name}`;
        console.log("before, after: ",before,specimen);
        log(`changing name from ${before.name} to ${specimen.name} with id ${specimen.id}`)
        let wrap = {payLoad:specimen,sourceContext };
        postWrap(url,wrap).then(r => r.json()).then(showIt)

    }

    tests[3] = function(){
        url = urlSet.delete;
        let specimen =  {
            "name":`dont know yet`
        }
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

    tests[4] = function(){
        url =urlSet.add;
        let specimen = addModel|| {
            "name":`with ${new Date().getTime()}'s apostrophe test`
        }
        log(`testing adding with appostrophe ${sourceContext} name :${specimen.name}`);
   
        log(`adding :${JSON.stringify(specimen)}`)
        let wrap = {payLoad:specimen,sourceContext};
        postWrap(url,wrap).then(r => r.json()).then(showIt)

    }
    function doNextTest()
    {
        let n = tests.length;

        if(currentTest>= n) 
        {
            showIt("no more tests");
            return;
        }
        let nextTest = tests[currentTest];

        nextTest();
        currentTest++;
    }