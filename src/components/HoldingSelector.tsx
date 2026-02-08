import { Holding } from "@wealthfolio/addon-sdk";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Icons,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@wealthfolio/ui";
import { useState } from "react";

export function HoldingSelector({
  holdings,
  selectedHolding,
  onHoldingSelect,
}: {
  holdings: Holding[];
  selectedHolding: Holding | null;
  onHoldingSelect: (holding: Holding) => void;
}) {
  const [open, setOpen] = useState(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between sm:w-[200px]"
        >
          {selectedHolding
            ? selectedHolding.instrument?.symbol ?? selectedHolding.instrument?.symbol
            : "Select holding..."}
          <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 sm:w-[200px]">
        <Command>
          <CommandInput placeholder="Search holdings..." />
          <CommandList>
            <CommandEmpty>No holdings found.</CommandEmpty>
            <CommandGroup>
              {holdings.map((holding) => (
                <CommandItem
                  key={holding.instrument?.symbol ?? holding.id}
                  value={holding.instrument?.symbol ?? holding.id}
                  onSelect={() => {
                    onHoldingSelect(holding);
                    setOpen(false);
                  }}
                >
                  <Icons.Check
                    className={`mr-2 h-4 w-4 ${
                      selectedHolding?.id === holding.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span>{holding.instrument?.symbol ?? holding.id}</span>
                    {holding.id && (
                      <span className="text-muted-foreground text-xs">
                        {holding.instrument?.symbol ?? holding.id}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
