export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format Date (Month Day, Year)
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format Time (HH:mm AM/PM)
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};
