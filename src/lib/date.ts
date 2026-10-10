// Formats as "YYYY-MM-DD" in local time; toISOString() would use UTC and can be off by a day.
export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}
