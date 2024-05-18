
export const formatDate = (date) => {
  
  const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December",]
  const newDate = new Date(date)

    //get Date
    const monthInt = newDate.getMonth(); // Get the month (0-11)
    const month = monthArray[monthInt]
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
     const convertHours = philippineHours > 12 && philippineHours < 25 ? philippineHours - 12 : philippineHours > 24 ? philippineHours - 24 : philippineHours
     const formattedTime = philippineHours > 12 && philippineHours < 24 ? convertHours + ":" + timeArray[1] + " pm" : convertHours + ":" + timeArray[1] + " am"
    //  console.log("formattedTime: ", formattedTime)

     const finalDate = formattedDate + " | " + formattedTime
      
     return finalDate
  }
  