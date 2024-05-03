import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { PopoverContent } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

import { type Mode } from './constants';

const modes = [
  {
    id: 0,
    value: 'game master',
    label: 'Mode « Maître de Jeu »',
  },
  {
    id: 1,
    value: 'player',
    label: 'Mode « Chacun pour Soi »',
  },
];

interface Props {
  isModeOpen: boolean;
  mode: Mode;
  setIsModeOpen: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<Mode>>;
}

export function ChooseGameMode({
  isModeOpen,
  mode,
  setIsModeOpen,
  setMode,
}: Props) {
  return (
    <Popover open={isModeOpen} onOpenChange={setIsModeOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isModeOpen}
          className="justify-between w-1/2"
        >
          {modes.find(({ value }) => value === mode.value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {modes.map(({ value, label }) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(currentValue) => {
                    const selectedMode = modes.find(
                      (m) => m.value === currentValue,
                    );

                    if (selectedMode) {
                      setMode(selectedMode);
                      setIsModeOpen(false);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      mode.value === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
