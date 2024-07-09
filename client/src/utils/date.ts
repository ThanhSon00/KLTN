export function convertToReadableDate(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const year = date.getUTCFullYear();
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
  
    // Construct the readable date string
    const readableDate = `${month} ${day}, ${year}`;
  
    return readableDate;
  }

export function isoToDateTimeString(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function isoToDateString(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}