function toSeconds(t: Date): number {
  return t.getUTCHours() * 3600 + t.getUTCMinutes() * 60 + t.getUTCSeconds();
}

export function intervalTime(
  startTime: Date, // jam shift mulai
  endTime: Date, // jam check-in
) {
  const diffSec = toSeconds(endTime) - toSeconds(startTime);
  return Math.max(0, Math.floor(diffSec / 60));
}
