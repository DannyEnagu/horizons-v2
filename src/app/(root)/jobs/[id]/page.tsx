import { fetchJobDetails } from "@/server/actions/jobs.action";
import { PageURLProps } from "@/types";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, SquareArrowOutUpRight } from "lucide-react";

export default async function JobDetailsPage(props: PageURLProps) {
    const { id } = await props.params;
    const jobDetails = await fetchJobDetails(id);

    return (<div className="container md:grid grid-cols-[2fr_1fr] gap-8">
        <div className="border-b md:border-b-0 md:border-r border-color">
            <header className="px-4">
                <h1 className="h1-bold text-dark100_light900 mb-4">{jobDetails?.title}</h1>
                <div>
                    <a
                        href={jobDetails?.organization_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative text-light400_light500 inline-flex items-center gap-1 after:content-[' '] after:background-light400_light500 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1px]"
                    >
                        <span>{jobDetails?.organization}</span>
                        <Image
                            src="/icons/external-link.svg"
                            alt="external Link to company"
                            width={18}
                            height={18}
                            className="w-5 h-5 active-theme"
                        />
                    </a>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span>{jobDetails?.countries_derived[0]}</span>
                    <span className="w-2 h-2 rounded-full background-light200_dark400" />
                    <span>{jobDetails?.remote_derived ? 'Remote' : 'Onsite'}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-light400_light500 capitalize">
                        {jobDetails?.employment_type[0].replace('_', '-').toLocaleLowerCase()}
                    </span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-light400_light500 text-xs">Posted on {formatDateTime(jobDetails?.date_posted as string)}</span>
                    <span className="text-light400_light500 text-xs">
                        Valid till {formatDateTime(jobDetails?.date_validthrough as string)}
                    </span>
                </div>
            </header>
            <Separator className="my-4" />
            <div className="pb-8 px-4">
                <h2 className="h2-bold text-dark100_light900 mb-8">Description</h2>
                <p className="text-light400_light500">{jobDetails?.description_text}</p>
            </div>
        </div>
        <div className="p-4">
            <div className="flex flex-col gap-4 sm:w-[200px] mx-auto mt-4">
                <Button variant="secondary" className="w-full">
                    <span className="flex-1">Apply Now</span>
                    <SquareArrowOutUpRight size={20} />
                </Button>
                <Button variant="outline" className="w-full">
                    <span className="flex-1">Save Job</span>
                    <Bookmark size={20} />
                </Button>
            </div>
        </div>
    </div>);    
}