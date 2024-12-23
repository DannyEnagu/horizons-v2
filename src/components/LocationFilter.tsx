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

interface LocationPickerProps {
    counties: Country[];
}

export default function LocationFilter({ counties }: LocationPickerProps) {
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

    return (<Select onValueChange={(value) => handleUpdateParams(value)}>
        <SelectTrigger className="background-light800_dark_gradient px-3 py-6 gap-4 w-full">
            <MapPin className="text-light400_light500"/>
            <span className="text-dark500_light700">
                <SelectValue placeholder="Select Location" />
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