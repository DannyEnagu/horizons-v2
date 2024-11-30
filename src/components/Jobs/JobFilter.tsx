'use client';
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export type FilterItem = {
    label: string | number;
    value: string | number;
    isActive: string | boolean
}

interface JobFilterProps {
    placeholder: string;
    items: FilterItem[];
    multiple?: boolean;
    onFilterChange: (value: FilterItem) => void;
}

export default function JobFilter({ placeholder, items, onFilterChange }: JobFilterProps) {
    const handleFilterChange = (checked: CheckedState, value: FilterItem) => {
        value.isActive = checked;
        onFilterChange(value);
    }
    return (
        <Popover>
            <PopoverTrigger asChild className="text-light400_light500 border border-color rounded text-xs w-[150px]">
            <Button variant="ghost" size="sm">
                <span className="line-clamp-1 flex-1 text-left">
                    {placeholder}
                </span>
                <ChevronDown className="text-light400_light500" />
            </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="max-w-[210px] rounded border border-color bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
                <ul className="p-4 space-y-1">
                    {items.map((item) => (
                        <li key={item.value}>
                            <Label className="flex items-center gap-4 text-sm font-normal">
                                <Checkbox onCheckedChange={(checked) => handleFilterChange(checked, item)} />
                                <span>{item.label}</span>
                            </Label>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}