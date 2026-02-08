import { type AddonContext } from "@wealthfolio/addon-sdk";
import { useAccounts } from "./use-accounts";

interface UseTrackerProgressOptions {
  ctx: AddonContext;
}

export function useTrackerProgress({ ctx }: UseTrackerProgressOptions) {
  const {
    data: accounts = [],
    isLoading: isLoadingAccounts,
    error: accountsError,
  } = useAccounts({ ctx });

  const isLoading = isLoadingAccounts // || isLoadingValuations || isLoadingGoals || isLoadingAllocations;
  const error = accountsError //|| valuationsError || goalsError || allocationsError;

  return {
    accounts,
    isLoading,
    error,
  };
}
