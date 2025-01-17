import Image from "next/image";
import Card from "./Card";

export default function PostedJobs() {
    return (
        <Card className=" bg-white dark:dark-gradient">
            <Card.Header>
                <h2 className="text-base font-bold">
                    Posted Jobs
                </h2>
            </Card.Header>
            <Card.Content className="md:h-[350px] overflow-auto">
                <ul>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                        <li key={index}>
                            <JobSummary
                                job={{
                                    title: "Senior Software Engineer",
                                    icon: "/icons/briefcase.svg",
                                    employmentType: "Full-time",
                                    location: "Remote"
                                }}
                            />
                        </li>
                    ))}
                    <li>
                        <JobSummary
                            job={{
                                title: "Senior Software Engineer",
                                icon: "/icons/briefcase.svg",
                                employmentType: "Full-time",
                                location: "Remote"
                            }}
                        />
                    </li>
                </ul>
            </Card.Content>
        </Card>
    )
}

interface Job {
    title: string;
    icon: string;
    employmentType: string;
    location: string;
}

const JobSummary = ({job}: {job: Job}) => {
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
                    <span>{job.employmentType}</span>,
                    <span>{job.location}</span>
                </div>
            </div>
        </div>
    );
}