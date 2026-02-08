import { HistoryChartData } from "../types"

export function aggregateByDay(
  data: HistoryChartData[],
): HistoryChartData[] {
  const map = new Map<string, HistoryChartData>()

  for (const entry of data) {
    const date = new Date(entry.date) // <-- 🔥 cruciaal

    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    const existing = map.get(dayKey)

    if (!existing || date.getTime() > new Date(existing.date).getTime()) {
      map.set(dayKey, {
        ...entry,
        date,
      })
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )
}
