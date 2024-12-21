'use client';
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { getUpdatedParams } from "@/lib/utils";

interface SearchInputProps {
    placeholder: string;

}

export default function SearchBar({ placeholder } : SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleUpdateFilterParams = (value: string, param: string) => {
        const newUrl = getUpdatedParams(value, param, searchParams.toString());
        router.push(newUrl, { scroll: false });
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            handleUpdateFilterParams('', 'query');
            return;
        }
        if (e.target.value.length < 3) return;
        handleUpdateFilterParams(e.target.value, 'query');
    }
    
    return (
        <div className="flex items-center gap-2 background-light800_dark_gradient px-4 py-1 rounded-lg">
            <Search className="text-light400_light500" />
            <Input
                placeholder={placeholder ? placeholder : 'Start Typing'}
                className="flex-1 text-dark400_light700 bg-transparent dark:bg-transparent border-0 outline-none shadow-none focus-visible:ring-offset-0 dark:focus-visible:ring-offset-0 focus-visible:ring-transparent dark:focus-visible:ring-transparent placeholder"
                onChange={handleQueryChange}
            />
        </div>
    )
}