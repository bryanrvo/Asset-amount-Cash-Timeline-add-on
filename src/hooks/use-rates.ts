import { useQuery } from "@tanstack/react-query";
import { type AddonContext, ExchangeRate, QueryKeys } from "@wealthfolio/addon-sdk";

interface UseAccountsOptions {
  ctx: AddonContext;
  enabled?: boolean;
}

export function useRates({ ctx, enabled = true }: UseAccountsOptions) {
  return useQuery<ExchangeRate[]>({
    queryKey: [QueryKeys.EXCHANGE_RATES],
    queryFn: async () => {
      if (!ctx.api) {
        throw new Error("API context is required");
      }

      const data = await ctx.api.exchangeRates.getAll();
      return data || [];
    },
    enabled: enabled && !!ctx.api,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
