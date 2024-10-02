export function getDiffTimeInFormat(time: string) {
  const now = new Date();
  const orig_time = new Date(time);
  const diff = Math.floor((now.getTime() - orig_time.getTime()) / 1000);

  if (diff < 60) {
    return `${diff.toFixed(0)}s`;
  }

  const diffMin = Math.floor(diff / 60);
  if (diffMin < 60) {
    return `${diffMin.toFixed(0)}m`;
  }

  const diffHour = Math.floor(diffMin / 60);
  const leftMin = diffMin % 60;

  return (
    `${diffHour.toFixed(0)}H ` +
    `${leftMin <= 9 ? "0" : ""}${leftMin.toFixed(0)}m`
  );
}

export default function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
