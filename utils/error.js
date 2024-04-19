class error extends Error{
    constructor(message = "Error occured" )
    {
        super(message);
        this.message  = message;
        
    }

}
export{error};