import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { Account, DateRange, Holding, type AddonContext } from "@wealthfolio/addon-sdk";
import {
  Button,
  DateRangeSelector,
  EmptyPlaceholder,
  Icons,
  Page,
  PageContent,
  PageHeader,
  useBalancePrivacy
} from "@wealthfolio/ui";
import React, { useEffect, useState } from "react";
import { HelpPopover } from "./components";
import { AccountSelector } from "./components/AccountSelector";
import { AssetAndCashTimelineChart } from "./components/AssetAndCashTimelineChart";
import { HoldingsDisplay } from "./components/HoldingsDisplay";
import { HoldingSelector } from "./components/HoldingSelector";
import { useTimeLinesAndHoldings } from "./hooks/use-timeline-holdings";
import { useTrackerProgress } from "./hooks/use-tracker-progress";
import { HistoryChartData } from "./types";



// Main Investment Target Tracker component
function AssetAmountAndCashTimeline({ ctx }: { ctx: AddonContext }) {

  const [account, setAccount] = useState<Account | null>(null);
  const [holding, setHolding] = useState<Holding | null>(null);

  const [AssetTimelineData, setAssetTimelineData] = useState<HistoryChartData[]>([])
  const [CashTimeLineData, setCashTimeLineData] = useState<HistoryChartData[]>([])
  const [value, setValue] = useState<DateRange | undefined>();


  const { accounts: accounts, rates, activities, BaseCurrency, isLoading :isLoadingTrackerProgress, error: trackerProgressError } = useTrackerProgress({ ctx });
  const { holdings,  AssetTimelineData: AssetTimelineDataRaw = [], CashTimeLineData: CashTimeLineDataRaw = [], isLoading: isLoadingTimeLinesAndHoldings, error: TimeLinesAndHoldingsError } = useTimeLinesAndHoldings({ ctx, account, holding, activities, BaseCurrency, rates })

  const isLoading = isLoadingTrackerProgress // || isLoadingTimeLinesAndHoldings
  const error = trackerProgressError || TimeLinesAndHoldingsError

  if (!account && !isLoadingTrackerProgress) {
    setAccount(accounts.find((account: Account) => account.id == "TOTAL") || accounts[0]);
  }

  if (!value && !isLoadingTrackerProgress && CashTimeLineDataRaw.length > 0) {
    setValue({ from: new Date("2000-01-01"), to: new Date() })
  }


  useEffect(() => {
  if (AssetTimelineDataRaw.length > 0 && value !== undefined) {
    const filteredDataAsset = AssetTimelineDataRaw.filter((item) => {
      return new Date(item.date) >= value?.from;
    });
    console.log('filteredDataAsset', filteredDataAsset.length)

    // Doe hier iets met de gefilterde data, bijvoorbeeld opslaan in een nieuwe variabele
    setAssetTimelineData(filteredDataAsset); // Voeg de gefilterde data toe aan de statefilteredData;
  }
  if (CashTimeLineDataRaw.length > 0 && value !== undefined) {
    console.log(value?.from)
    console.log(new Date(CashTimeLineDataRaw[0].date))
    const filteredDataCash = CashTimeLineDataRaw.filter((item) => {
      return new Date(item.date) >= value?.from;
    });
    // Doe hier iets met de gefilterde data, bijvoorbeeld opslaan in een nieuwe variabele
    setCashTimeLineData(filteredDataCash); // Voeg de gefilterde data toe aan de statefilteredData;
  }
  if (!holding){
    setAssetTimelineData([])
  }
}, [value, AssetTimelineDataRaw.length, account, (holding && AssetTimelineDataRaw)]);


  // Get balance privacy state
  const { isBalanceHidden } = useBalancePrivacy();


  const headerDescription = "Track Cash Balance and Asset Balances: Monitor and manage your financial assets with ease.";

  const headerActions =
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <DateRangeSelector value={value} onChange={setValue} />
        <AccountSelector
          accounts={accounts}
          selectedAccount={account}
          onAccountSelect={(acc) => {
            setAccount(acc);
            setHolding(null); // reset holding bij account switch
          }}
        />
        <HoldingSelector
          holdings={holdings}
          selectedHolding={holding}
          onHoldingSelect={setHolding}
        />
    </div>

  const header = (
    <PageHeader actions={headerActions}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold sm:text-xl">Asset amount & Cash Timeline</h1>
          <HelpPopover />
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">{headerDescription}</p>
      </div>
    </PageHeader>
  );

  if (isLoading || BaseCurrency === undefined) {
    return (
      <Page>
        {header}
        <PageContent>
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <Icons.Loader className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">Loading data...</p>
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        {header}
        <PageContent>
          <div className="flex min-h-[40vh] items-center justify-center px-4">
            <div className="text-destructive max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950">
              <h3 className="mb-2 text-base font-semibold">Error Loading Data</h3>
              <p className="text-sm">{error?.message}</p>
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <Page>
        {header}
        <PageContent>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <EmptyPlaceholder className="mt-16">
                <EmptyPlaceholder.Icon name="AlertTriangle" />
                <EmptyPlaceholder.Title>No Accounts Selected</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  You haven&apos;t select any accounts yet. select first an account to start
                  tracking your progress.
                </EmptyPlaceholder.Description>
                <Button onClick={() => ctx.api.navigation.navigate("/settings/accounts")}>
                  <Icons.Plus className="mr-2 h-4 w-4" />
                  Create Your First Account
                </Button>
              </EmptyPlaceholder>
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }

  if (CashTimeLineDataRaw.length === 0 && AssetTimelineDataRaw.length === 0) {
        return (
          <Page>
        {header}
        <PageContent>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <EmptyPlaceholder className="mt-16">
                <EmptyPlaceholder.Icon name="Activity" />
                <EmptyPlaceholder.Title>No data found</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    There are no transactions associated with this account. Please add transactions to see data.
                </EmptyPlaceholder.Description>
                <Button onClick={() => ctx.api.navigation.navigate("/activities")}>
                    <Icons.Plus className="mr-2 h-4 w-4" />
                    Create Your First Activitie
                </Button>
              </EmptyPlaceholder>
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }

  return (
    <Page>
      {header}
      <div className="grid gap-4 md:grid-cols-3">
        <AssetAndCashTimelineChart
          ctx={ctx}
          classname="md:col-span-2"
          HeaderTilte="Cash Timeline"
          data={CashTimeLineData}
          isBalanceHidden={isBalanceHidden}
          RawDataLengteEmpty={CashTimeLineDataRaw.length === 0}
        />
        <HoldingsDisplay
          ctx={ctx}
          holdings={holdings}
          baseCurrency={BaseCurrency}
          onHoldingSelect={setHolding}
        />
        <AssetAndCashTimelineChart
          ctx={ctx}
          classname="md:col-span-2"
          HeaderTilte="Asset Timeline"
          data={AssetTimelineData}
          isBalanceHidden={isBalanceHidden}
          RawDataLengteEmpty={AssetTimelineDataRaw.length === 0}
        />
      </div>
    </Page>
  );
}

/**
 * Asset Balance Timeline Addon
 *
 * Features:
 * - Select a specific account
 * - Select a specific asset / holding
 * - View cash balance over time based on transactions
 * - View asset amount over time for the selected holding
 * - Transaction-level timeline for better balance tracking and debugging
 */
export default function enable(ctx: AddonContext) {
  ctx.api.logger.info("🎯 Asset amount & Cash Timeline addon is being enabled!");

  // Store references to items for cleanup
  const addedItems: Array<{ remove: () => void }> = [];

  try {
    // Add sidebar navigation item
    const sidebarItem = ctx.sidebar.addItem({
      id: "asset-and-cash-timeline" ,
      label: "Asset amount & Cash Timeline",
      icon: <Icons.Monitor className="h-5 w-5" />,
      route: "/addon/asset-and-cash-timeline",
      order: 200,
    });
    addedItems.push(sidebarItem);

    ctx.api.logger.debug("Sidebar navigation item added successfully");

    // Create wrapper component with QueryClientProvider using shared client
    const AssetAmountAndCashTimelineWrapper = () => {
      const sharedQueryClient = ctx.api.query.getClient() as QueryClient;
      return (
        <QueryClientProvider client={sharedQueryClient}>
          <AssetAmountAndCashTimeline ctx={ctx} />
        </QueryClientProvider>
      );
    };

    // Register route
    ctx.router.add({
      path: "/addon/asset-and-cash-timeline",
      component: React.lazy(() =>
        Promise.resolve({
          default: AssetAmountAndCashTimelineWrapper,
        }),
      ),
    });

    ctx.api.logger.debug("Route registered successfully");
    ctx.api.logger.info("Asset amount & Cash Timeline addon enabled successfully");
  } catch (error) {
    ctx.api.logger.error("Failed to initialize addon: " + (error as Error).message);
    // Re-throw the error so the addon system can handle it
    throw error;
  }

  // Register cleanup callback
  ctx.onDisable(() => {
    ctx.api.logger.info("🛑 Asset amount & Cash Timeline addon is being disabled");

    // Remove all sidebar items
    addedItems.forEach((item) => {
      try {
        item.remove();
      } catch (error) {
        ctx.api.logger.error("Error removing sidebar item: " + (error as Error).message);
      }
    });

    ctx.api.logger.info("Asset amount & Cash Timeline addon disabled successfully");
  });
}
