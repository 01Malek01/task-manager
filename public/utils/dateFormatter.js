const formatDateTime = function (timestamp) {
  // Create a Date object from the timestamp
  const currentDate = new Date(timestamp);

  // Format the date
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time in 12-hour format
  const twelveHourTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // This option ensures 12-hour format
  });

  return `${formattedDate}, ${twelveHourTime}`;
};

export default formatDateTime