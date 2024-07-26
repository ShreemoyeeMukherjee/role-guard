const getDate = (time)=>{
    // this function creates a current Date with the specified time
    // time is in HH:mm format
    // This is done to verify the validity of timings
    //First the current date is obtained , then the hours and minutes are set according to the given time for ease of comparison
    const parts = time.split(":");
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const new_date = new Date();
    new_date.setHours(hours);
    new_date.setMinutes(minutes);
    return(new_date);
}
export{getDate};