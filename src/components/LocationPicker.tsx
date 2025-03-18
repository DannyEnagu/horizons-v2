'use client';
import { MapPin } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Country } from "@/types";
import { getUpdatedParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

interface LocationPickerProps {
    counties: Country[];
    placeholder: string;
    isSelectInput?: boolean;
}

export default function LocationPicker({
    counties,
    placeholder,
    isSelectInput
}: LocationPickerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    
    const handleUpdateParams = (value: string) => {
        const newUrl = getUpdatedParams(value, 'location', searchParams.toString());
        router.push(newUrl, { scroll: false });
    }

    const sortedCountries = counties ? counties.sort((a, b) => a.name.localeCompare(b.name)) : null;

    const locations = [
        {
            name: 'Flexible / Remote',
        },
        ...sortedCountries || []
    ]

    if (!isSelectInput) {
        return (
            <div className="flex items-center gap-2 background-light800_dark_gradient px-4 py-1 rounded-lg">
                <MapPin className="text-light400_light500" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    className="flex-1 text-dark400_light700 bg-transparent dark:bg-transparent border-0 outline-none shadow-none focus-visible:ring-offset-0 dark:focus-visible:ring-offset-0 focus-visible:ring-transparent dark:focus-visible:ring-transparent placeholder"
                    onChange={(e) => handleUpdateParams(e.target.value)}
                />
            </div>
        )
    }

    return (<Select onValueChange={(value) => handleUpdateParams(value)}>
        <SelectTrigger className="background-light800_dark_gradient px-3 py-6 gap-4 w-full">
            <MapPin className="text-light400_light500"/>
            <span className="text-dark500_light700">
                <SelectValue placeholder={placeholder} />
            </span>
        </SelectTrigger> 
        <SelectContent className="rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300 max-h-[350px] max-w-[210px]">
            <SelectGroup>
                {locations ? locations.map((country) => (
                    <SelectItem
                    key={country.name}value={country.name}>
                        {country.name}
                    </SelectItem>
                )) : (
                    <SelectItem value="No data found">
                        No data found
                    </SelectItem>
                )}
            </SelectGroup>
        </SelectContent>
    </Select>
    );
}