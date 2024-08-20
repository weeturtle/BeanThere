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

export const formatLastVisit = (date: Date) => {
  if (!date) return "Never visited";

  // Convert into days/weeks/months/years

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    return "today";
  } else if (days === 1) {
    return "yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks === 1) {
    return "last week";
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(weeks / 4);
  if (months === 1) {
    return "last month";
  } else if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  if (years === 1) {
    return "last year";
  }
  return `${years} years ago`;
};

export default formatTime;
