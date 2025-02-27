export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format Date (Month Day, Year)
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format Time (HH:mm AM/PM)
  //   const formattedTime = date.toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });

  return `${formattedDate}`;
};

export const formatToDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
