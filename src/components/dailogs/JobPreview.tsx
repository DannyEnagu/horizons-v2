import Image from "next/image";
import { Separator } from "../ui/separator";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import { formatDateTime } from "@/lib/utils";
import { Button } from "../ui/button";

type JobDetails = {
    title: string;
    companyName: string;
    location: string;
    employmentTypes: string;
    postedOn: string;
    validUntil: string;
    description: string;
    companyWebSite: string;
    level: string;
}

interface JobPreviewProps {
    jobDetails: JobDetails;
    onPostJob: () => void;
    onCancel: () => void;
}

export default function JobPreview({
    jobDetails: {
        title,
        companyName,
        location,
        employmentTypes,
        postedOn,
        validUntil,
        description,
        companyWebSite,
        level
    },
    onPostJob,
    onCancel,
}: JobPreviewProps) {
    return (<Dialog>
        <DialogTrigger asChild>
            <Button
                disabled={!title || !companyName || !location || !employmentTypes || !description || !companyWebSite || !level}
                size="sm"
                variant="link"
                className="no-underline"
            >
                Preview
            </Button>
        </DialogTrigger>
        <DialogContent className="dialog-lg">
            <DialogHeader>
                <DialogTitle className="text-center">
                    Job Details Preview
                </DialogTitle>
                <DialogDescription className="text-xs text-center">
                    This is how your job will look like to the applicants
                </DialogDescription>
            </DialogHeader>
            <div>
                <header className="px-4">
                    <h1 className="h1-bold text-dark100_light900 mb-4">{title}</h1>
                    <div>
                        <a
                            href={companyWebSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-light400_light500 inline-flex items-center gap-1 after:content-[' '] after:background-light400_light500 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1px]"
                        >
                            <span>{companyName}</span>
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
                        <h3 className="text-xs mb-2 mt-4">Location:</h3>
                        <span className="pl-2 text-sm">
                            {location}
                        </span>
                    </div>
                    <p className="mt-2 text-light400_light500">
                        {/* Employment Types */}
                        <span className="text-xs">Employment Types:</span> <br />
                        <span className="pl-2 text-sm">{employmentTypes}</span>
                    </p>
                    <p className="mt-2 text-light400_light500">
                        {/* Level */}
                        <span className="text-xs">Level:</span> <br />
                        <span className="pl-2 text-sm">
                            {level}
                        </span>
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                        <span className="text-light400_light500 text-xs">Posted on: {formatDateTime(postedOn as string)}</span>
                        <span className="text-light400_light500 text-sm">
                            Valid till: {validUntil ? formatDateTime(validUntil as string) : 'N/A'}
                        </span>
                    </div>
                </header>
                <Separator className="my-4" />
                <div className="pb-8 px-4 text-light400_light500">
                    <div dangerouslySetInnerHTML={{ __html: description  }} />
                </div>
            </div>
            <DialogFooter className="flex-row justify-end gap-3">
                <DialogClose asChild>
                    <Button size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onPostJob}
                >
                    Post Job
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>);
}