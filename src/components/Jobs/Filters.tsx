'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { getUpdatedParams } from "@/lib/utils";
import { JOB_TYPES } from "@/constants/global";
import JobFilter from "./JobFilter";

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleUpdateFilterParams = (value: string, param: string) => {
        const newUrl = getUpdatedParams(value, param, searchParams.toString());
        router.push(newUrl, { scroll: false });
    }

    const handleJobTypeFilterChange = (value: string) => {
        handleUpdateFilterParams(value, 'level');
    }

    const JobTypes = JOB_TYPES.map((type) => ({ label: type.replace('_', ' '), value: type.toLowerCase().replaceAll(' ', '-'), isActive: true }));

    return (
        <div className="mt-8 flex items-center flex-wrap gap-4">
            <JobFilter
                placeholder="Experience Level"
                items={JobTypes}
                onFilterChange={handleJobTypeFilterChange}
            />
    </div>
    )
}