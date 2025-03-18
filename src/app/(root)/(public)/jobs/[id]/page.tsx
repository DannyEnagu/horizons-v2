import { fetchJobDetails } from "@/server/actions/jobs.action";
import { PageURLProps } from "@/types";
import { Separator } from "@/components/ui/separator"
import { formatDateTime } from "@/lib/utils";
import JobDetailsActionButtons from "@/components/Jobs/JobDetailsAction";
import { Job } from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { getUsersByKindeId } from "@/server/actions/user.action";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { Briefcase, Calendar, ExternalLink, Heart, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function JobDetailsPage(props: PageURLProps) {
    const { id } = await props.params;
    const {getUser} = getKindeServerSession();
    const kindeUser = await getUser();
    const user = await getUsersByKindeId(kindeUser?.id);
    
    const {result: jobDetails} = await fetchJobDetails(id);

    const isRemote = jobDetails?.location ? jobDetails?.location[0].toLocaleLowerCase().includes('remote') : false;

    const removeDuplicateHTMLTags = (html: string) => {
        return html.replace('Job Description', 'Description');
    };


    return (<div className="container md:grid grid-cols-[2fr_1fr] gap-8">
        <div className="border rounded-lg border-color">
            <header className="p-4">
                <h1 className="relative h1-bold text-dark100_light900 mb-4">
                    <span>
                        {jobDetails?.title as string}
                    </span>
                    <span role="button" className="absolute -top-6 -right-3 text-3xl p-2">
                        <Heart className="inline-block" />
                    </span>
                </h1>
                <div className="flex flex-col md:items-center md:justify-between gap-2 mt-2">
                    <p className="text-light400_light500 flex items-center gap-1">
                        <Calendar className="w-5 h-5" />
                        <span>
                            Posted on {formatDateTime(jobDetails?.postedOn as string)}
                        </span>
                    </p>
                    {jobDetails?.validUntil && <p className="text-light400_light500">
                             <Calendar className="w-5 h-5" />
                            <span>Expires on {formatDateTime(jobDetails?.validUntil as string)}</span>
                        </p>
                    }
                </div>
                {/* TODO: Add Skills to Postgres Job Schema */}
                {/* <div className="mt-4">
                    <Skills skills={jobDetails?.skills} />
                </div> */}
            </header>
            <Separator className="my-4" />
            <div className="pb-8 px-4 text-light400_light500">
                <div dangerouslySetInnerHTML={{ __html: removeDuplicateHTMLTags(jobDetails?.description as string) }} />
            </div>
        </div>
        <div className="py-4 border rounded-lg border-color">
            <div className="space-y-8 mb-8 px-4">
                <div className="flex items-center gap-4">
                    <div className="rounded shadow dark:border dark:border-color flex items-center justify-center w-[100px] h-[100px]">
                        <Avatar className="h-full w-full">
                            <AvatarImage
                                src={jobDetails.companyLogo || ''}
                                alt="Company Logo"
                            />
                            <AvatarFallback>
                                {jobDetails?.companyName
                                    ? jobDetails.companyName.charAt(0) + jobDetails.companyName.charAt(1).toLocaleUpperCase()
                                    : ''}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h2 className="h3-semibold">
                            {jobDetails?.companyName}
                        </h2>
                        <a
                            href={jobDetails?.externalSourceUrl || ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-color rounded-lg p-2 py-1 mt-2"
                        >
                            <span className="flex-1 text-center text-sm font-semibold italic text-muted">
                                Visit Website
                            </span>
                            <ExternalLink className="w-5 h-5 text-green-500" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {jobDetails?.employmentTypes && <p className="flex items-center gap-2 text-light400_light500 ">
                        <Briefcase className="w-5 h-5" />
                        <span>{jobDetails?.employmentTypes?.split(',').join('  |  ')}</span>
                    </p>}
                    <p className="flex items-center gap-2 text-light400_light500">
                       <MapPin className="w-5 h-5" />
                        <span>
                            {isRemote
                                ? 'Remote'
                                : jobDetails?.location?.split(',').join('  |  ')
                            }
                        </span>
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            {jobDetails.externalSourceUrl 
                ? (<JobDetailsActionButtons
                    job={jobDetails as Job}
                    userId={user?.id as string}
                />)
                : (<>
                    {/* <Separator className="my-4" /> */}
                    <ApplicationForm
                        job={jobDetails as Job}
                        user={user}
                    />
                </>)
            }
        </div>
    </div>);    
}