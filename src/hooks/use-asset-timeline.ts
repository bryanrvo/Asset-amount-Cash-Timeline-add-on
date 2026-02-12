import { useQuery } from '@tanstack/react-query';
import { Account, ActivityDetails, Holding } from '@wealthfolio/addon-sdk';
import { buildAssetTimeline } from '../lib/AssetTimeline';
import { HistoryChartData } from '../types';


interface useAssetTimelineOptions  {
  account : Account | null,
  holding: Holding | null,
  activities: ActivityDetails[]
}

export function useAssetTimeline({ account, holding, activities }: useAssetTimelineOptions) {
  return useQuery({
    queryKey: [account, holding, activities],
    queryFn: async (): Promise<HistoryChartData[]> => {

        if (!holding || !activities) {
            return [];
        }

      const accountId = account?.id ?? "TOTAL";
      const holdingsymbol = holding.instrument?.symbol ?? holding.id

      const AssetTimeLine = buildAssetTimeline({ accountId, assetId:holdingsymbol, activities })

      return AssetTimeLine;
    },

    enabled: !!account && !!holding && !!activities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
