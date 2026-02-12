import { useQuery } from '@tanstack/react-query';
import { Account, ActivityDetails, ExchangeRate } from '@wealthfolio/addon-sdk';
import { buildCashTimeline } from '../lib/cashTimeline';
import { HistoryChartData } from '../types';


interface useACasTimelineOptions  {
  account : Account | null,
  BaseCurrency: string | undefined,
  rates: ExchangeRate[],
  activities: ActivityDetails[]
}

export function useCashTimeline({ account, BaseCurrency, rates, activities }: useACasTimelineOptions) {
  return useQuery({
    queryKey: [account, BaseCurrency, rates, activities],
    queryFn: async (): Promise<HistoryChartData[]> => {

      const accountId = account?.id ?? "TOTAL";
      const Currency = BaseCurrency ?? "USD";
      const AssetTimeLine = buildCashTimeline({ accountId, BaseCurrency: Currency, rates , activities })

      return AssetTimeLine;
    },

    enabled: !!account && !!BaseCurrency && !!activities && !!rates,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
