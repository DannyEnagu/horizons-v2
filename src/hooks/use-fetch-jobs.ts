'use client';
import { useEffect, useState } from "react";
import { ApplicationStatus, Job } from "@prisma/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getJobApplicationsByStatus } from "@/server/actions/employer.action";

function useFetchJobs(status: ApplicationStatus) {
    const { getUser } = useKindeBrowserClient();
    const userId = getUser()?.id;
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    async function fetchJobs() {
        try {
            const jobs = await getJobApplicationsByStatus(userId, status);
            console.log(jobs, 'jobs');
            setJobs(jobs);
            setLoading(false);
        } catch (error) {
            console.error(`❌ ${error} ❌`);
            setLoading(false);
        }
    }
    
    fetchJobs();
  }, [userId, status]);

    return { loading, jobs};
}

export default useFetchJobs;