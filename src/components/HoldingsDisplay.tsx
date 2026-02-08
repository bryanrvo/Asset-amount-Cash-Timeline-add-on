import { AddonContext, Holding } from "@wealthfolio/addon-sdk";
import { Button, Card, CardContent, EmptyPlaceholder, Icons } from "@wealthfolio/ui";
import { HoldingRow } from "./holdingRow";

interface HoldingsDisplayrops {
  ctx: AddonContext;
  holdings: Holding[];
  baseCurrency: string;
  onHoldingSelect: (holding: Holding) => void;
}


export function HoldingsDisplay({ctx, holdings, baseCurrency, onHoldingSelect }: HoldingsDisplayrops) {

    const setHolding = (holding: Holding) => {
      onHoldingSelect(holding);
    };

    if (holdings.length === 0){
        return (<Card className="md:col-span-1 md:row-span-2">
                    <CardContent className="px-4 pt-4 pb-2">
                        <EmptyPlaceholder className="mx-auto flex max-w-[420px] items-center justify-center">
                            <EmptyPlaceholder.Icon name="Wallet" />
                            <EmptyPlaceholder.Title>No data available</EmptyPlaceholder.Title>
                            <EmptyPlaceholder.Description>
                                You haven&apos;t have any holdings in this account yet. Select another account or create new activities to get started.
                            </EmptyPlaceholder.Description>
                            <Button onClick={() => ctx.api.navigation.navigate("/settings/accounts")}>
                                <Icons.Plus className="mr-2 h-4 w-4" />
                                Create Your First Account
                            </Button>
                        </EmptyPlaceholder>
                    </CardContent>
            </Card>)
    }

    return (
        <Card className="md:col-span-1 md:row-span-2">
            <CardContent className="px-4 pt-4 pb-2">
                  <div className="space-y-4">
                    {holdings.map((holding) => {
                      return (
                        <HoldingRow
                          key={holding.id}
                          holding={holding}
                          baseCurrency={baseCurrency}
                          onHoldingSelect={setHolding}
                        />
                      );
                    })}
                    </div>
              </CardContent>
            </Card>
    );
}
