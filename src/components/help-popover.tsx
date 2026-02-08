import { Button, Icons, Popover, PopoverContent, PopoverTrigger } from "@wealthfolio/ui";

// Help popover component using shadcn Popover
function HelpPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Help">
          <Icons.HelpCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">How It Works</h4>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>• Select an account first.</p>
              <p>• Then you can check the cash balance.</p>
              <p>• On the right side, the holdings will be displayed when selecting a holding.</p>
              <p>• By selecting a holding, you can see the quantity over time.</p>
              <p>• It's also possible to select a holding on the top right.</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { HelpPopover };
