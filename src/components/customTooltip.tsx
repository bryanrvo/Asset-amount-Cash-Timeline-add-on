import { AmountDisplay } from "@wealthfolio/ui";
import { CustomTooltipProps, HistoryChartData, TooltipEntry } from "../types";


export const CustomTooltip = ({
  active,
  payload,
  isBalanceHidden,
  isChartHovered,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const totalValueData = payload.find(
    (item): item is TooltipEntry & { dataKey: "totalValue"; payload: HistoryChartData } =>
      item?.dataKey === "totalValue" && item.payload !== undefined,
  );
  const netContributionData = payload.find(
    (item): item is TooltipEntry & { dataKey: "netContribution"; payload: HistoryChartData } =>
      item?.dataKey === "netContribution" && item.payload !== undefined,
  );

  const tvPayload = totalValueData?.payload;
  const ncPayload = netContributionData?.payload;

  if (!tvPayload) {
    return null;
  }

  const totalValue = totalValueData?.payload?.totalValue
  const ActivityType = totalValueData?.payload?.ActivityType
  return (
    <div className="bg-popover grid grid-cols-1 gap-1.5 rounded-md border p-2 shadow-md">
      <p className="text-muted-foreground text-xs">{(tvPayload.date)}</p>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-1.5">
          <span className="block h-0.5 w-3" style={{ backgroundColor: "var(--success)" }} />
          <span className="text-muted-foreground text-xs">Total Value:</span>
          {/* <span>{(totalValue)}</span> */}
        </div>
        <AmountDisplay
          value={tvPayload.totalValue}
          currency={tvPayload.currency}
          isHidden={isBalanceHidden}
          className="text-xs font-semibold"
        />
      </div>
      {isChartHovered && ncPayload && (
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-1.5">
            <span
              className="block h-0 w-3 border-b-2 border-dashed"
              style={{ borderColor: "var(--muted-foreground)" }}
            />
            <span className="text-muted-foreground text-xs">Transaction Amount:</span>
            {/* <span>{(totalValue)}</span> */}
          </div>
          <AmountDisplay
            value={ncPayload.netContribution}
            currency={ncPayload.currency}
            isHidden={isBalanceHidden}
            className="text-xs font-semibold"
          />
        </div>
      )}
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-1.5">
          <span className="block h-0.5 w-3" style={{ backgroundColor: "var(--success)" }} />
          <span className="text-muted-foreground text-xs">ActivityType:</span>
          <span>{(ActivityType)}</span>
        </div>
      </div>
    </div>
  );
};
