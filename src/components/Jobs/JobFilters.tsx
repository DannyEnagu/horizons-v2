'use client';
import { useRouter, useSearchParams } from "next/navigation";

import { getUpdatedParams, removeKeysFromQuery } from "@/lib/utils";
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

    const handleRemoveFilter = (key: string) => {
        const newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove:  [key] });
        router.push(newUrl, { scroll: false });
    }

    const handleJobTypeFilterChange = (value: FilterItem) => {
        if (!value.isActive) {
            if (value.value === 'REMOTE') {
                handleRemoveFilter('isRemote');
                return;
            }
            selectedJobType.splice(selectedJobType.indexOf(value.value as string), 1);
            const allSelectedJobTypes = selectedJobType.join(',');

            if (allSelectedJobTypes === '') {
                handleRemoveFilter('type');
                return;
            }
            
            handleUpdateFilterParams(allSelectedJobTypes, 'type');
            return;
        };
        if (value.isActive && value.value === 'REMOTE') {
            handleUpdateFilterParams('true', 'isRemote');
            return;
        }
        selectedJobType.push(value.value as string);
        const allSelectedJobTypes = selectedJobType.join(',');
        handleUpdateFilterParams(allSelectedJobTypes, 'type');
    }

    const JobTypes = JOB_TYPES.map((type) => ({ label: type.replace('_', ' '), value: type, isActive: false }));

    return (
        <div className="mt-8 flex items-center flex-wrap gap-4">
            <JobFilter placeholder="Job Types" items={JobTypes} onFilterChange={handleJobTypeFilterChange}  />
            {/* <JobFilter placeholder="Salary" items={[]}  />
            <JobFilter placeholder="Benefits" items={[]}  /> */}
    </div>
    )
}