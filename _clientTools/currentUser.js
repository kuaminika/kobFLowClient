var UserToolService = {};

(function (tool){

    function User()
    {
        this.id = 1;// for now;
    }
    function UserTool(){
        let self = this;
        let currentUser = new User();
        self.getUserInfo = function()
        {
            return currentUser;
        }

        
    }

     const createNew =  ()=>{return new UserTool()};
     tool.currentUserTool = createNew();


})(UserToolService)