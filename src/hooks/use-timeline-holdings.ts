import { Account, ActivityDetails, ExchangeRate, Holding, type AddonContext } from "@wealthfolio/addon-sdk";
import { useAssetTimeline } from "./use-asset-timeline";
import { useCashTimeline } from "./use-cash-timeline";
import { useHoldings } from "./use-holdings";

interface UseTrackerProgressOptions {
  ctx: AddonContext;
  account: Account | null;
  holding: Holding | null;
  activities: ActivityDetails[];
  BaseCurrency: string | undefined;
  rates: ExchangeRate[]
}

export function useTimeLinesAndHoldings({ ctx, account, holding, activities, BaseCurrency, rates }: UseTrackerProgressOptions) {

  const {
    data: allholdings = [],
    isLoading: isLoadingHoldings,
    error: HoldingsError,
  } = useHoldings({ accountId: account?.id ?? "TOTAL", ctx });

    const holdings = allholdings.filter(
        holding => holding && !holding.id.includes("CASH") && holding.accountId === account?.id
    );

    holdings.sort((a, b) => {
        const symbolA = a.instrument?.symbol ?? a.id;
        const symbolB = b.instrument?.symbol ?? b.id;
        return symbolA.localeCompare(symbolB);
    })

  const { data: AssetTimelineData = [], isLoading: AssetTimelineLoading, error: AssetTimelineError } = useAssetTimeline({ account, holding, activities })
  const { data: CashTimeLineData = [], isLoading: CashTimeLineLoading, error: CashTimeLineError } = useCashTimeline({ account,  BaseCurrency, rates, activities })


  const isLoading = isLoadingHoldings || AssetTimelineLoading || CashTimeLineLoading
  const error =  HoldingsError || AssetTimelineError|| CashTimeLineError

  return {
    holdings,
    AssetTimelineData,
    CashTimeLineData,
    isLoading,
    error,
  };
}
