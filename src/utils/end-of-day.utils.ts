export function toEndOfDayUTC(iso: string | Date): Date {
  const d = new Date(iso);
  return new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23,
      59,
      59,
      0,
    ),
  );
}
