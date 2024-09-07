export const getPriorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "red";

    case "LOW":
      return "amber";

    case "MEDIUM":
      return "lime";

    default:
      return "#bdc3c7";
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
