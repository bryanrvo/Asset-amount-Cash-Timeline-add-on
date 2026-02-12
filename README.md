# Asset amount & Cash Timeline

This add-on lets you track your cash balance and asset accumulation over time, with transaction-level insights and interactive holdings timelines per account.

## Features

- **Automatic Multi-Account Tracking**: All accounts are selected by default, allowing you to instantly track your total cash balance and asset accumulation across your entire portfolio.

- **Cash Balance Calculation Engine**: Cash balances are dynamically calculated using transaction-based logic powered by custom hooks such as `useTrackerProgress` and `useTimeLinesAndHoldings`.

- **Integrated Data Fetching via API Hooks**: Portfolio data is retrieved using dedicated hooks including `useAccounts`, `useRates`, `useSettings`, `useActivities`, and `useHoldings`.

- **Interactive Cash Timeline**: Visualize cash movements over time with transaction-level detail.

- **Holdings Overview Panel**: View all holdings across accounts in a structured side panel for quick inspection.

- **Holding Timeline Analysis**: Select a holding to track its quantity evolution and performance over time.

- **Advanced Time Range Filters**: Apply range filters (1W, 1M, 6M, YTD, 1Y, 3Y, 5Y, ALL) to define a specific time window and perform deeper portfolio analysis.


## How It Works


1. **Automatic Account Selection**  
   All accounts are selected by default to provide a complete overview of your portfolio performance.

2. **Load and Process Portfolio Data**  
   The add-on fetches activities, holdings, exchange rates, accounts, and settings through API hooks and processes them into structured timelines.

3. **Calculate Cash Over Time**  
   Cash balances are calculated per transaction using internal logic (`useTrackerProgress`, `useTimeLinesAndHoldings`) and visualized on an interactive timeline.

4. **Aggregate Asset Quantities**  
   Asset quantities are accumulated dynamically based on buy/sell activity across all selected accounts.

5. **Apply Time Filters for Deeper Analysis**  
   Use built-in range filters (1W, 1M, 6M, YTD, 1Y, 3Y, 5Y, ALL) to focus on specific periods and analyze portfolio behavior within a defined timeframe.

6. **Explore and Analyze Holdings**  
   Select a holding to view its quantity evolution and timeline-based performance within the chosen time range.
6. **Analyze Over Time**: Selected holdings update the asset timeline to reflect quantity changes over time

## Installation

1. Build the addon:

   ```bash
   pnpm build
   ```

2. Package the addon:

   ```bash
   pnpm package
   ```

3. Install in Wealthfolio through the addon settings page

## Development

To work on this addon:

```bash
# Install dependencies
pnpm install

# Start development mode (watches for changes)
pnpm dev

# Build for production
pnpm build

# Create distribution package
pnpm bundle
```

## API Usage

This addon demonstrates how to:

- Use `ctx.api.goals.getAll()` to fetch user's investment goals
- Access portfolio data through multiple hooks (`useHoldings`, `useAccounts`,
  `useLatestValuations`)
- Calculate goal progress using proper allocation logic with
  `useGoalAllocations`
- Create custom React hooks for complex data fetching and processing
- Build interactive UI components with tooltips and searchable dropdowns
- Handle loading states, error states, and empty states gracefully
- Integrate with the Wealthfolio sidebar navigation and routing system
- Use the shared QueryClient for optimal data caching and performance

## Permissions Required

- **Portfolio Access**: To read current holdings and calculate asset quantities, portfolio distribution, and cash impact.

- **Activities Access**: To process all transactions and build accurate cash balance and asset timelines over time.

- **Exchange Rates Access**: To retrieve exchange rate data for proper multi-currency calculations and valuation.

- **Settings Access**: To access application settings, including the configured base currency.

- **Accounts Access**: To load all accounts for automatic multi-account tracking and timeline aggregation.

- **UI Access**: To integrate with the Wealthfolio interface, including adding sidebar items, registering routes, and handling addon lifecycle events.


## License

MIT License - see the main Wealthfolio project for details.
