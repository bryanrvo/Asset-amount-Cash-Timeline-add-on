import { Account, type AddonContext } from "@wealthfolio/addon-sdk";
import { useAccounts } from "./use-accounts";
import { useActivities } from "./use-activities";
import { useRates } from "./use-rates";
import { UseSettings } from "./use-settings";

interface UseTrackerProgressOptions {
  ctx: AddonContext;
}

export function useTrackerProgress({ ctx }: UseTrackerProgressOptions) {
  const {
    data: ActiveAccounts = [],
    isLoading: isLoadingAccounts,
    error: accountsError,
  } = useAccounts({ ctx });

  const {
    data: rates = [],
    isLoading: isLoadingRates,
    error: RatesError,
  } = useRates({ ctx });

  const {
    data: Settings = undefined,
    isLoading: isLoadingBaseCurrency,
    error: BaseCurrencyError,
  } = UseSettings({ ctx });

  const {
    data: activities = [],
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useActivities({ ctx });

  const BaseCurrency = Settings?.baseCurrency

  const totalAccount: Account = {
  id: "TOTAL",
  name: "TOTAL",
  accountType: "CASH",
  isDefault: false,
  isActive: false,
  balance: 0,
  currency: Settings?.baseCurrency || "", // Provide a default value if baseCurrency is undefined
  createdAt: new Date(),
  updatedAt: new Date(),
};

const accounts = ActiveAccounts.length !== 0 ? [...ActiveAccounts, totalAccount] : [];


  const isLoading = isLoadingAccounts || isLoadingRates || isLoadingBaseCurrency || activitiesLoading;
  const error = accountsError || RatesError  || BaseCurrencyError || activitiesError;

  return {
    accounts,
    rates,
    activities,
    BaseCurrency,
    isLoading,
    error,
  };
}
