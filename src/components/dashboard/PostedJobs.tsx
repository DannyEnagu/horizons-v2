"use client";

import { useEffect, useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import Card from "./Card";
import { getEmployerJobPosts } from "@/server/actions/employer.action";
import { Job } from "@prisma/client";

export default function PostedJobs() {
    const { getUser } = useKindeBrowserClient();
    const userId = getUser()?.id;
    const [postedJobs, setPostedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchPostedJobs() {
            try {
                const jobs = await getEmployerJobPosts(userId);
                setPostedJobs(jobs);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(`❌ ${error} ❌`);
            }
        }
        fetchPostedJobs();
    }, [userId]);

    return (
        <Card className=" bg-white dark:dark-gradient">
            <Card.Header>
                <h2 className="text-base font-bold">
                    Posted Jobs
                </h2>
            </Card.Header>
            <Card.Content className="md:h-[350px] lg:h-[450px] overflow-auto">
                <ul className="space-y-1">
                    <PostedJobItems postedJobs={postedJobs} loading={loading} />
                    {loading && <LoadingJobSummary />}
                </ul>
            </Card.Content>
        </Card>
    )
}

const PostedJobItems = ({postedJobs, loading}: {
    postedJobs: Job[],
    loading: boolean
}) => {
    return (
        <>
            {postedJobs.length > 0 && postedJobs.map((job) => (
                <li key={job.id}>
                    <JobSummary
                        job={{
                            title: job.title,
                            icon: "/icons/briefcase.svg",
                            employmentType: job.employmentTypes,
                            location: job.location
                        }}
                    />
                </li>
            ))}
            {(!postedJobs.length && !loading) && (
                <li>
                    <JobSummary
                        job={{
                            title: "No jobs posted yet",
                            icon: "/icons/briefcase.svg",
                            employmentType: 'N/A',
                            location: "N/A"
                        }}
                    />
                </li>
            )}
        </>
    )
}

interface JobSummaryProps {
    title: string;
    icon: string;
    employmentType: string | null;
    location: string;
}

const JobSummary = ({job}: {job: JobSummaryProps}) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
                <Image
                    src={job.icon}
                    alt={job.title}
                    width={30}
                    height={30}
                />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold">{job.title}</h3>
                <div className="text-muted text-xs">
                    <span>{job.employmentType}</span> / {' '}
                    <span>{job.location}</span>
                </div>
            </div>
        </div>
    );
}

const LoadingJobSummary = () => {
    return (
        <>
            {Array.from({length: 8}).map((_, index) => (
                <li key={index} className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                        <Skeleton className="w-8 h-8" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-1/2 h-3" />
                    </div>
                </li>
            ))}
        </>
    );
}