const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatTime = (date: Date) => {
  // Today at HH:MM AM/PM
  // Yesterday at HH:MM AM/PM
  // MONTH DD at HH:MM AM/PM

  let formattedDate = "";

  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    formattedDate = "Today";
  } else if (
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    formattedDate = "Yesterday";
  } else {
    formattedDate = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  formattedDate += ` at ${padTime(date.getHours())}:${padTime(date.getMinutes())}`;

  return formattedDate;
};

const padTime = (time: number) => {
  return time < 10 ? `0${time}` : time;
};

export default formatTime;
