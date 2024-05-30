export const getDateTime = ({data}) => {

    const selectedDate = new Date(data.selectedDate);
    const selectedTime = new Date(data.selectedTime);

    selectedDate.setUTCHours(selectedDate.getUTCHours() + 8);
    selectedTime.setUTCHours(selectedTime.getUTCHours() + 8);

    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

    let hours = selectedTime.getUTCHours();
    const minutes = selectedTime.getUTCMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedSelectedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;

    return { date: formattedSelectedDate, time:formattedSelectedTime };
}


