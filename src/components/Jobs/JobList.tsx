
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatDateTime, limitString } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Job } from "@prisma/client";

function JobCard({
    id,
    title,
    description,
    location,
    employmentTypes,
    postedOn,
    companyLogo,
    companyName
}: Job) {
    return (<Card className="bg-light-900 dark:bg-dark-300 border border-color p-0">
            <CardHeader className="border-b border-color p-0">
                <CardTitle className="flex items-center gap-2 font-normal text-sm py-2 px-4">
                    <div className="flex items-center flex-wrap gap-2">
                        {employmentTypes && <>
                            <span className="w-2 h-2 rounded-full background-light200_dark400" />
                            <span>
                                {employmentTypes}
                            </span>
                        </>
                        }
                        <span>
                            {location}
                        </span>
                        <span className="w-2 h-2 rounded-full background-light200_dark400" />
                        <span className="text-light400_light500 text-xs">
                            <span>Posted on: </span>
                            <span>
                                {postedOn ? formatDateTime(postedOn.toString()) : 'N/A'}
                            </span>
                        </span>
                    </div>
                    <Button size="sm" variant="link" className="ml-auto">
                        <Link href={`/jobs/${id}`} className="active-theme flex items-center gap-1">
                            <span>View Details</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-8 p-4">
                <div className="hidden rounded shadow dark:border dark:border-color sm:flex items-center justify-center w-[100px] h-[100px]">
                    <Avatar className="h-full w-full">
                        <AvatarImage
                            src={companyLogo || ''}
                            alt="Company Logo"
                        />
                        <AvatarFallback>
                            {companyName.charAt(0) + companyName.charAt(1).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">
                        {limitString(title, 50)}
                    </h3>
                    <p className="capitalize">
                        {description}
                    </p>   
                </div>
            </CardContent>
        </Card>
    );
}

interface JobListProps {
    jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
    return (<div className="max-w-[900px] mx-auto">
            <ul className="space-y-8">
                {jobs.map((job) => (
                    <li key={job.id}>
                        <JobCard {...job} />
                    </li>
                ))}
            </ul>
        </div>
    )
}