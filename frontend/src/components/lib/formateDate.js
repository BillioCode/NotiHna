export function formatDate(date) {
  return date.toLocaleString("en-US", {  // Changed to toLocaleString instead of toLocaleDateString
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",    // Add hours
    minute: "2-digit",  // Add minutes
    hour12: true        // Use 12-hour format (3:45 PM)
  });
}