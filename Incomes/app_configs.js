 
var urlSet = {}; 
( function(set)
{
    let url = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=Income`;
    let urlIncomeSource = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=IncomeSource`;
    let urlCategory = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=IncomeCategory`;
    let urlKobHolder = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=getAll&sourceContext=KobHolder`;
    let urlForDelete=  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=delete`;
    let urlForAdd = `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=add`;
    let urlForUpdate =  `https://dev.korosol.com/kobFLow/KobFlow/API/index.php?context=Flows&requestAction=update`;

    set.values = {url,urlIncomeSource,urlCategory,urlKobHolder,urlForDelete,urlForUpdate,urlForAdd};

})(urlSet)
urlSet = urlSet.values;
