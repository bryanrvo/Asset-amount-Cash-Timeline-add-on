# Asset amount & Cash Timeline

This add-on lets you track your cash balance and asset accumulation over time, with transaction-level insights and interactive holdings timelines per account.

## Features

- **Account-Based Tracking**: Select an account to monitor your cash balance and asset growth over time

- **Cash Balance Timeline**: Visualize cash movements over time with transaction-level details

- **Transaction Insights**: Inspect individual transactions to see their impact on cash and assets

- **Holdings Overview**: View all holdings for the selected account in a clear side panel

- **Holding Timeline Analysis**: Select a holding to track its quantity evolution over time

- **Quick Holding Selection**: Instantly analyze a holding using the top-right holding selector


## How It Works

1. **Select an Account**: Choose an account to initialize cash and asset tracking

2. **Load Transaction History**: The add-on processes all transactions to build cash balance and asset timelines

3. **Track Cash Over Time**: Cash balances are calculated per transaction and visualized on a timeline

4. **Aggregate Asset Quantities**: Asset quantities are accumulated based on buy/sell activity

5. **Explore Holdings**: Holdings are listed per account and can be selected for detailed analysis

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

- **Portfolio Access**: To read current holdings, account balances, and
  calculate investment progress
- **Accounts Access**: To access account information for portfolio calculations


## License

MIT License - see the main Wealthfolio project for details.
