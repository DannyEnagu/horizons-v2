'use client';

import { Bookmark, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast"
import { Job, User } from "@prisma/client";
import { saveJob } from "@/server/actions/jobs.action";
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import Spinner from "../shared/Spinner";

export default function JobDetailsActionButtons({ job, userId }: 
    { job: Job, userId: User['id'] }
) {
    const {isAuthenticated} = useKindeBrowserClient();
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSaveJob = async () => {
        if (!isAuthenticated) {
            redirect(`/api/auth/login?post_login_redirect_url=/jobs/${job.id}`);
        }
        setIsSaving(true);
        const jobPayload = {
            ...job,
            id: `${job.id}`,
            externalSourceID: `${job.externalSourceID}`,
            descriptionType: job.descriptionType || 'html',
            employerId: job.employerId || 'cm4be5t620000qcvon5tsqpbm',
            validUntil: job.validUntil || null
        };
        const saved =  await saveJob({ job: jobPayload, userId: userId });
        setIsSaving(false);
        if (!saved.isSuccessful) {
            toast({
                variant: "destructive",
                description: saved.message,
            })
            return;
        }
        toast({
            variant: "success",
            description: saved.message,
        })

    }
    return (<div className="flex flex-col gap-4 px-4">
        <p className="text-base bg-yellow-500/15 p-4 rounded-lg italic">
            This job was posted from an external source. You will be redirected to the external source to apply.
        </p>
        <Button variant="secondary" className="w-full">
            <a
                href={job.externalSourceUrl || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full"
            >
                <span className="flex-1">
                    Visit Job Posting
                </span>
                <SquareArrowOutUpRight size={20} />
            </a>
        </Button>
        <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSaveJob()}
        >
            <span className="flex-1">
                Save Job for Later
            </span>
            {isSaving ? <Spinner /> : <Bookmark size={20} />}
        </Button>
    </div>)
}