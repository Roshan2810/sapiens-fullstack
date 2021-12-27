const millisecondsToDate = (millisec) => {
  const date = new Date(millisec);
  return date
    .toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
    .toUpperCase();
};

export default millisecondsToDate;
