import { ActivityDetails, ExchangeRate } from '@wealthfolio/addon-sdk';
import { HistoryChartData } from '../types';

interface CashTimeLineOptions {
  accountId : string;
  BaseCurrency : string;
  rates: ExchangeRate[];
  activities: ActivityDetails[]
}

export async function buildCashTimeline({ accountId, BaseCurrency, rates, activities }: CashTimeLineOptions) {

  const activitiesFilterd = accountId === "TOTAL" ? activities : activities.filter(t => t.accountId === accountId);

  let cash = 0
  const rawTimeline: HistoryChartData[] = []

  const sorted = activitiesFilterd.sort(
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
        break;
      }
    }

    if (rateIndex !== -1) {
      rate = rates[rateIndex].rate;
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
