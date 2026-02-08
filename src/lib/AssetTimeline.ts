import { ActivityDetails, AddonContext } from '@wealthfolio/addon-sdk';
import { HistoryChartData } from '../types';

interface AssetTimeLineOptions {
  ctx: AddonContext
  accountId : string
  assetId: string
}

export async function buildAssetTimeline({ ctx, accountId, assetId }: AssetTimeLineOptions): Promise<HistoryChartData[]> {

  const activities: ActivityDetails[] = await ctx.api.activities.getAll(accountId)

  let totalQuantity = 0
  const rawTimeline: HistoryChartData[] = []

  const sorted = activities
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
