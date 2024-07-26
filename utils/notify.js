const notifyUser = (user_id, resource_id,allowed_duration)=>{
    // we need to use a promise here because setTimeout doesnot return a promise on its
    //own
    
    const allowed_duration_ms = allowed_duration*600*1000;
    // setTimeout's parameter is in miliseconds
    const promise = new Promise((resolve)=>{
        setTimeout(()=>{
            const message = `Time duration for accessing resource  having id ${resource_id} by  user having ${user_id} is over`
            resolve(message);
        },allowed_duration_ms)
    })
    return(promise);
}
export{notifyUser};
