'use client';
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button"
import { removeKeysFromQuery } from "@/lib/utils";


export default function ClearFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClearFilter = () => {
        const searchedKeys = Array.from(searchParams.keys());
        const newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove:  searchedKeys });
        router.push(newUrl, { scroll: false });
    }
    
    return (
        <Button variant="outline" size="sm" className="text-sm text-gray-500 dark:text-gray-400" onClick={() => handleClearFilter()}>
            Clear Filter
        </Button>
    );
}