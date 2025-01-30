'use client';
import { useEffect, useState } from "react";
import PageTitle from "@/components/employer/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/shared/data-table/columns-config/jobs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Job } from "@prisma/client";
import { getJobApplicationsByStatus } from "@/server/actions/employer.action";

export default function Page() {
    const { getUser } = useKindeBrowserClient();
    const userId = getUser()?.id;
    // const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobs = await getJobApplicationsByStatus(userId, 'PENDING');
                console.log(jobs, 'jobs');
                setJobs(jobs);
            } catch (error) {
                console.error(`❌ ${error} ❌`);
            }
        }
        fetchJobs();
    }, [userId]);

    return (
        <div>
            <PageTitle>
                Applications
            </PageTitle>
            
            {/* Table */}
            <div className="mt-8">
                <DataTable
                    columns={columns}
                    data={jobs}
                />
            </div>
        </div>
    );
}
