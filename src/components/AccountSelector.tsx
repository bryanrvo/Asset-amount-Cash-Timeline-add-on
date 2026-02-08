import { Account } from "@wealthfolio/addon-sdk";
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

export function AccountSelector({
  accounts,
  selectedAccount,
  onAccountSelect,
}: {
  accounts: Account[];
  selectedAccount: Account | null;
  onAccountSelect: (account: Account) => void;
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
          {selectedAccount ? selectedAccount.name : "Select account..."}
          <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 sm:w-[200px]">
        <Command>
          <CommandInput placeholder="Search accounts..." />
          <CommandList>
            <CommandEmpty>No accounts found.</CommandEmpty>
            <CommandGroup>
              {accounts.map((account) => (
                <CommandItem
                  key={account.id}
                  value={account.name}
                  onSelect={() => {
                    onAccountSelect(account);
                    setOpen(false);
                  }}
                >
                  <Icons.Check
                    className={`mr-2 h-4 w-4 ${
                      selectedAccount?.id === account.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  <span>{account.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
