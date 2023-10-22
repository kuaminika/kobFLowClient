function KTabNav(options)
{
    let self = this;
    let defaultOptions = { classOfTab : "nav-item",classOfActiveTab:"active"};
    self.options ={ ...defaultOptions,... options };
    
    
    function getAllTabs()
    {
        let d = document.getElementById(self.options.id);
        return d.getElementsByClassName(self.options.classOfTab);
    }
    self.getAllTabs = getAllTabs;
    self.deactivateAll = ()=>
    {
        let allTabs = getAllTabs();
        let n = allTabs.length;
        for(let i =0;i<n;i++)
        {
            let tb = allTabs[i];
            tb.className =  tb.className.replace(self.options.classOfActiveTab,"");
            let a =  tb.getElementsByTagName("a")[0];
            a.className = a.className.replace(self.options.classOfActiveTab,"");
        }
        
    }

    self.activateTab = (tabName)=>{
        self.deactivateAll();

        let d = document.getElementById(self.options.id);
        let tb =  d.querySelector(".nav-item[name='"+tabName+"']");
        console.log(tb);

        if(!tb) return;

 

        tb.className = tb.className+" active";
        let a =  tb.getElementsByTagName("a")[0];
        a.className = a.className +" active";

    }
    
    console.log(self);

    if(!self.options.id) throw "id not provided for KTabNav";

}