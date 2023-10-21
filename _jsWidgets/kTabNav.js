function KTabNav(options)
{
    let self = this;
    let defaultOptions = { classOfTab : "nav-item", id:"",classOfActiveTab:"active"};
    self.options = options ||{};
    function getAllTabs()
    {
        return document.getElementsByClassName(classOfTab);
    }
    self.deactivateAll = ()=>
    {
        let allTabs = getAllTabs();
        allTabs.forEach(tb=>{
            tb.className =  tb.className.remove("active");

        });
    }

    self.activateTab = (tabName)=>{
        self.deactivateAll();
        

    }
    
    console.log(self);

    if(!self.options.id) throw "id not provided for KTabNav";

}