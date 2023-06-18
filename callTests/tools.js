function postWrap(fullURL,data,headerRules)
{
    console.log("posting:"+fullURL);
   headerRules = headerRules || {  'Content-Type': 'application/json'  };
   
   var promiseResult = new Promise(function(resolve,reject)
   {

       reject = reject ||snitchProblem;
       try 
       {					 

        return 	fetch(fullURL,
               {
                 method: 'POST',
                 body: JSON.stringify(data),
                 headers: headerRules
               })        
               .then(response => {
                   if (typeof(response) == "object") resolve(response);
                   if(typeof(response)== "string")  resolve(JSON.parse(response));
               },reject)
       }
       catch(e)
       {
           snitchProblem(e);
       }			

   });

   

   return promiseResult;

}