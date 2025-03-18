'use client';
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label";
import { useState } from "react";

export type FilterItem = {
    label: string | number;
    value: string | number;
    isActive: string | boolean
}

interface JobFilterProps {
    placeholder: string;
    items: FilterItem[];
    multiple?: boolean;
    onFilterChange: (value: string) => void;
}

export default function JobFilter({ placeholder, items, onFilterChange }: JobFilterProps) {
    const [checked, setChecked] = useState('');
    const handleFilterChange = (value: string) => {
        setChecked(value);
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
                            <RadioGroup value={checked} onValueChange={handleFilterChange}>
                                <div className="flex items-center space-x-2 text-sm font-normal">
                                    <RadioGroupItem
                                        value={`${item.value}`} id={`${item.value}`}
                                    />
                                    <Label htmlFor={`${item.value}`}>{item.label}</Label>
                                </div>
                            </RadioGroup>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}