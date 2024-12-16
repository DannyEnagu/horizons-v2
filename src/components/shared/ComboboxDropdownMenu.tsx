"use client"

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const labels = [
    'Pending',
    'Interviewing',
    'Rejected',
    'Offered',
    'Hired',
]

interface ComboboxDropdownMenuProps {
    itemId: string;
    label: string;
    showLabels?: boolean;
    setLabel: (label: string) => void;
    onDelete: (id: string) => void;
}

export function ComboboxDropdownMenu(
    { itemId, setLabel, showLabels, onDelete, label }: ComboboxDropdownMenuProps
) {
      const [open, setOpen] = React.useState(false)
    
      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="border border-color py-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        {showLabels && (
                            <DropdownMenuSubTrigger>
                                {label}
                            </DropdownMenuSubTrigger>
                        )}
                        <DropdownMenuSubContent className="p-0">
                        <Command>
                            <CommandInput
                                placeholder="Filter label..."
                                autoFocus={true}
                                className="h-9"
                            />
                            <CommandList>
                            <CommandEmpty>No label found.</CommandEmpty>
                            <CommandGroup>
                                {labels.map((label) => (
                                <CommandItem
                                    key={label}
                                    value={label}
                                    onSelect={(value) => {
                                    setLabel(value)
                                    setOpen(false)
                                    }}
                                >
                                    {label}
                                </CommandItem>
                                ))}
                            </CommandGroup>
                            </CommandList>
                        </Command>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => onDelete(itemId)}>
                        Delete
                        <DropdownMenuShortcut>
                            ⌘⌫
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
      )
    }