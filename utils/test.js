function startTask(taskId, duration, callback) {
    const startTime = new Date();
    const setTime = duration * 60 * 60000; // Duration in milliseconds
  
    setTimeout(() => {
      callback(`Task ${taskId} is complete!`);
    }, setTime);
  }
  startTask('A', 10, (message) => console.log(message));
  startTask('B', 4, (message) => console.log(message));
  
  // You can call startTask multiple times dynamically with different durations and callbacks
    