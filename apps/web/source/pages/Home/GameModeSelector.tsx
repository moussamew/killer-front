import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { PopoverContent } from '@/components/ui/Popover';
import { type GameMode } from '@/constants/types';
import { cn } from '@/lib/utils';

import { GAME_MODES } from './constants';

interface Props {
  mode: GameMode;
  setMode: Dispatch<SetStateAction<GameMode>>;
}

export function GameModeSelector({ mode, setMode }: Props) {
  const [isModeOpen, setIsModeOpen] = useState(false);
  return (
    <Popover open={isModeOpen} onOpenChange={setIsModeOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          role="combobox"
          aria-expanded={isModeOpen}
          className="px-4 justify-between w-[fit-content] mb-4"
        >
          {GAME_MODES.find(({ value }) => value === mode.value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {GAME_MODES.map(({ value, label }) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(currentValue) => {
                    const selectedMode = GAME_MODES.find(
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
