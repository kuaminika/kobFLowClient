 app = app|| {};
app.loadProcedure = (args)=>{
    console.log("this is the load procedure for expense", args);
   let {urlMerchants,urlCategory} = args.urlSet;
 
    fetch(args.urlSet.urlKobHolder).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
            data.sort((a,b)=>(b.id-a.id));        
            app.choosers.account.setData(data);       
    });

    fetch(urlMerchants).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
    data.sort((a,b)=>(b.id-a.id));       
        app.choosers.merchant.setData(data);
    });


    
    fetch(urlCategory).then(r=>r.json()).then(wrapped=>wrapped.subject).then(data=>{
          
        data.sort((a,b)=>(b.id-a.id)); 
   
        app.choosers.category.setData(data); 
    });

}