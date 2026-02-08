import { AmountDisplay, Button, GainAmount, GainPercent } from "@wealthfolio/ui";
import { HoldingRowProps } from "../types";
import { TickerAvatar } from "./ticker-avatar";

export function HoldingRow({ holding, baseCurrency, onClick, onHoldingSelect }: HoldingRowProps) {
  const symbol = holding.instrument?.symbol ?? holding.id;
  const displayName = symbol.split(".")[0];
  const marketValue = holding.marketValue?.base ?? 0;
  const gainAmount = holding.unrealizedGain?.base ?? 0;
  const gainPercent = holding.unrealizedGainPct ?? 0;
  const shares = holding.quantity ?? 0;

  const handleHoldingSelect = () => {
    onHoldingSelect(holding);
  };

  return (
    <div
      className="group border-border hover:bg-muted/30 flex cursor-pointer items-center justify-between border-b py-3 transition-colors last:border-0"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-center gap-3">
        <Button onClick={handleHoldingSelect}>Analyse holding</Button>
        <TickerAvatar symbol={symbol} className="size-9" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{displayName}</span>
          <span className="text-muted-foreground text-xs">
            {shares.toLocaleString(undefined, { maximumFractionDigits: 3 })} shares
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <AmountDisplay
          value={marketValue}
          currency={baseCurrency}
          className="text-sm font-semibold"
        />
        <div className="flex items-center gap-2">
          <GainAmount
            value={gainAmount}
            currency={baseCurrency}
            displayCurrency={false}
            className="text-xs"
          />
          <GainPercent
            value={gainPercent}
            variant="badge"
            className="min-w-[60px] justify-center text-xs"
          />
        </div>
      </div>
    </div>
  );
}
