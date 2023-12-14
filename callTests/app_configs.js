var urlSet = {}; 
( function(set)
{
    let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Expense`;
    let urlMerchants = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Merchant`;
    let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=ExpenseCategory`;
    let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;
    let urlForDelete=  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
    let urlForAdd = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=add`;
    let urlForUpdate =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=update`;
    let urlIncomes=  `http://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Income`;

    set.values = {url,urlMerchants,urlCategory,urlKobHolder,urlForDelete,urlForUpdate,urlForAdd,urlIncomes};
    console.log(set);
})(urlSet)
urlSet = urlSet.values;
console.log(urlSet);