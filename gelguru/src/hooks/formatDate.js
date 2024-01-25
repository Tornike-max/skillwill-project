export function formatDateString(inputDateString) {
  const months = [
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

  const dateObj = new Date(inputDateString);

  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}
