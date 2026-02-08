import { ActivityDetails, AddonContext, ExchangeRate } from '@wealthfolio/addon-sdk';
import { HistoryChartData } from '../types';

interface CashTimeLineOptions {
  ctx: AddonContext;
  accountId : string;
  BaseCurrency : string;
}

export async function buildCashTimeline({ ctx, accountId, BaseCurrency }: CashTimeLineOptions) {

  const activities: ActivityDetails[] = await ctx.api.activities.getAll(accountId)

  const rates: ExchangeRate[] = await ctx.api.exchangeRates.getAll();

  let cash = 0
  const rawTimeline: HistoryChartData[] = []

  const sorted = activities.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  for (const a of sorted) {

    const fee = Number(a.fee ?? 0)

    const baseAmount = Number(a.amount ?? 0);


    let rate = 1;
    let rateIndex = -1;
    for (let i = 0; i < rates.length; i++) {
      if (
        (a.currency === rates[i].fromCurrency && rates[i].toCurrency === BaseCurrency) ||
        (a.currency === rates[i].toCurrency && rates[i].fromCurrency === BaseCurrency)
      ) {
        rateIndex = i;
        console.log(rateIndex)
        break;
      }
    }

    if (rateIndex !== -1) {
      rate = rates[rateIndex].rate;
      console.log(rate)
    } else {

      rate = 1;
    }

    const amount = baseAmount / rate;

    switch (a.activityType) {
      case 'DEPOSIT':
        cash += amount
        break
      case 'WITHDRAWAL':
        cash -= amount
        break
      case 'BUY':
        cash -= (amount + fee)
        break
      case 'SELL':
        cash += (amount - fee)
        break
      case 'TRANSFER_IN':
        cash += amount
        break
      case 'TRANSFER_OUT':
        cash -= amount
        break
    }

    rawTimeline.push({
      date: a.date,
      totalValue: cash,
      netContribution: amount,
      currency: a.assetId,
      ActivityType: a.activityType,
    })
  }

  return rawTimeline
}
