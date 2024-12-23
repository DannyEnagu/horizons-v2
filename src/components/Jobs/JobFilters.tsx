'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { getUpdatedParams } from "@/lib/utils";
import { JOB_TYPES } from "@/constants/global";
import JobFilter, { FilterItem } from "./JobFilter";

const selectedJobType: string[] = [];
export default function JobFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleUpdateFilterParams = (value: string, param: string) => {
        const newUrl = getUpdatedParams(value, param, searchParams.toString());
        router.push(newUrl, { scroll: false });
    }

    const handleJobTypeFilterChange = (value: FilterItem) => {
        if (!value.isActive) {
            selectedJobType.splice(selectedJobType.indexOf(value.value as string), 1);
            const allSelectedJobTypes = selectedJobType.join(',');
            
            handleUpdateFilterParams(allSelectedJobTypes, 'level');
            return;
        };
        selectedJobType.push(value.value as string);
        const allSelectedJobTypes = selectedJobType.join(',');
        handleUpdateFilterParams(allSelectedJobTypes, 'level');
    }

    const JobTypes = JOB_TYPES.map((type) => ({ label: type.replace('_', ' '), value: type, isActive: true }));

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