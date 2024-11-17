export default function generateTimeOptions(
  start: string,
  end: string,
  interval: number,
): string[] {
  const times: string[] = [];
  let [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    const formattedTime = `${String(startHour).padStart(2, "0")}:${String(
      startMinute,
    ).padStart(2, "0")}`;
    times.push(formattedTime);
    startMinute += interval;
    if (startMinute >= 60) {
      startHour++;
      startMinute -= 60;
    }
  }

  return times;
}
