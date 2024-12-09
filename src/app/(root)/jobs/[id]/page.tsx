import { fetchJobDetails } from "@/server/actions/jobs.action";
import { PageURLProps } from "@/types";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import JobDetailsActionButtons from "@/components/Jobs/JobDetailsAction";
import { Job } from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { getUsersByKindeId } from "@/server/actions/user.action";

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
        <div className="border-b md:border-b-0 md:border-r border-color">
            <header className="px-4">
                <h1 className="h1-bold text-dark100_light900 mb-4">{jobDetails?.title as string}</h1>
                <div>
                    <a
                        href={jobDetails?.externalSourceUrl || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative text-light400_light500 inline-flex items-center gap-1 after:content-[' '] after:background-light400_light500 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1px]"
                    >
                        <span>{jobDetails?.companyName}</span>
                        <Image
                            src="/icons/external-link.svg"
                            alt="external Link to company"
                            width={18}
                            height={18}
                            className="w-5 h-5 active-theme"
                        />
                    </a>
                </div>
                <div className="mt-2 text-light400_light500">
                    <h3 className="mb-2">Location:</h3>
                    <span className="pl-8">
                        {jobDetails?.location}
                    </span>
                    {/* <span className="w-2 h-2 rounded-full background-light200_dark400" /> */}
                </div>
                <div className="mt-2 text-light400_light500">
                    <span>
                        {isRemote ? 'Remote' : 'Onsite'}
                    </span>
                </div>
                {/* Employment Types */}
                {jobDetails?.employmentTypes}
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-light400_light500 text-xs">Posted on {formatDateTime(jobDetails?.postedOn as string)}</span>
                    <span className="text-light400_light500 text-xs">
                        Valid till {jobDetails?.validUntil ? formatDateTime(jobDetails?.validUntil as string) : 'N/A'}
                    </span>
                </div>
            </header>
            <Separator className="my-4" />
            <div className="pb-8 px-4 text-light400_light500">
                <div dangerouslySetInnerHTML={{ __html: removeDuplicateHTMLTags(jobDetails?.description as string) }} />
            </div>
        </div>
        <div className="p-4">
            <JobDetailsActionButtons
                job={jobDetails as Job }
                userId={user?.id as string}
            />
        </div>
    </div>);    
}