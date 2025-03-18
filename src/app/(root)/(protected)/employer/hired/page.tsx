'use client';

import PageTitle from "@/components/employer/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/shared/data-table/columns-config/jobs";
import useFetchJobs from "@/hooks/use-fetch-jobs";


export default function Page() {
    const { jobs, loading } = useFetchJobs('HIRED');
    return (
        <div>
            <PageTitle>
                Hired
            </PageTitle>
            
            {/* Table */}
            <div className="mt-8">
                <DataTable
                    columns={columns}
                    data={jobs}
                    loading={loading}
                />
            </div>
        </div>
    );
}
