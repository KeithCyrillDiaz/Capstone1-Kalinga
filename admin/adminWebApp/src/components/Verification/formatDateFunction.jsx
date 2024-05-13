
export const formatDate = (date) => {
  
  const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December",]
    const newDate = new Date("Fri May 10 2024 15:17:42 GMT+0800 (Philippine Standard Time)")

    //get Date
    const monthInt = newDate.getMonth(); // Get the month (0-11)
    console.log("month: ", monthInt)
    const month = monthArray[monthInt-1]
    const day = newDate.getDate()
    const year = newDate.getFullYear()
    const formattedDate = month + " " +  day + ", " + year
    // console.log("formattedDate: ", formattedDate)
    
    //get Time
    const dateArray = date.split("T")
    const extractTime = dateArray[1].split('.')
    const timeArray = extractTime[0].split(':');
    
    //convert to Philippine time
     const philippineHours = parseInt(timeArray[0]) + 8
     const convertHours = philippineHours > 12 ? philippineHours - 12 : philippineHours
     const formattedTime = philippineHours > 12 ? convertHours + ":" + timeArray[1] + " pm" : convertHours + ":" + timeArray[1] + " am"
    //  console.log("formattedTime: ", formattedTime)

     const finalDate = formattedDate + " | " + formattedTime
      
     return finalDate
  }
  