const getDate = (time)=>{
    // this function creates a current Date with the specified time
    // time is in HH:mm format
    const parts = time.split(":");
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const new_date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return(new_date);
}
export{getDate};