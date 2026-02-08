import { Holding } from "@wealthfolio/addon-sdk";

export interface HistoryChartData {
  date: Date;
  totalValue: number;
  netContribution: number;
  currency: string;
  ActivityType: string;
}

export interface HoldingRowProps {
  holding: Holding;
  baseCurrency: string;
  onClick?: () => void;
  onHoldingSelect: (holding: Holding) => void;
}

export interface TooltipEntry {
  dataKey?: string | number;
  payload?: HistoryChartData;
}

export interface TooltipBaseProps {
  active?: boolean;
  payload?: TooltipEntry[];
}

export interface CustomTooltipProps extends TooltipBaseProps {
  isBalanceHidden: boolean;
  isChartHovered: boolean;
}
