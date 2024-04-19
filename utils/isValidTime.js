import{isValid , parse} from "date-fns";
function isValidTime( start_time , end_time) 
{
    try{
   const parsed_startTime = parse(start_time,'HH:mm',new Date());
   const parsed_endTime = parse(end_time,'HH:mm',new Date());
    if(isValid(parsed_startTime) == false)
    {
        return(false);
    }
    if(isValid(parsed_endTime)  == false)
    {
        return(false);
        
    }
    const startDate = new Date(`2000-01-01T${start_time}`);
    const endDate = new Date(`2000-01-01T${end_time}`);
    
    
    if(endDate<startDate)
    {
        return(false);
    }
    return(true);
   
     
   
    }
    catch(error)
    {
        console.log(error.message);
    }
}
export{isValidTime};



