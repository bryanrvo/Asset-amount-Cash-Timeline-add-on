import { ActivityDetails } from '@wealthfolio/addon-sdk';
import { HistoryChartData } from '../types';

interface AssetTimeLineOptions {
  accountId : string
  assetId: string
  activities: ActivityDetails[]
}

export async function buildAssetTimeline({ accountId, assetId, activities }: AssetTimeLineOptions): Promise<HistoryChartData[]> {


  const activitiesFilterd = accountId === "TOTAL" ? activities : activities.filter(t => t.accountId === accountId);


  let totalQuantity = 0
  const rawTimeline: HistoryChartData[] = []

  const sorted = activitiesFilterd
    .filter(t => t.assetId === assetId && (t.activityType === 'BUY' || t.activityType === 'SELL' || t.activityType === 'ADD_HOLDING' || t.activityType === 'REMOVE_HOLDING'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())


  for (const t of sorted) {

    const quantity = Number(t.quantity ?? 0)
    if (t.activityType === 'BUY' || t.activityType === 'ADD_HOLDING' || t.activityType === 'DIVIDEND') {
      totalQuantity += quantity ?? 0
    } else if (t.activityType === 'SELL'|| t.activityType === 'REMOVE_HOLDING') {
      totalQuantity -= quantity ?? 0
    }

    rawTimeline.push({
      date: t.date,
      totalValue: totalQuantity,
      netContribution: quantity,
      currency: assetId,
      ActivityType: t.activityType,
    })

  }

  return rawTimeline
}
