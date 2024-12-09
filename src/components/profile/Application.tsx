"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge";

import type { Application } from "@prisma/client";
import Link from "next/link"
import { ComboboxDropdownMenu } from "../shared/ComboboxDropdownMenu";

// const labels = [
//     'Pending',
//     'Interviewing',
//     'Rejected',
//     'Offered',
//     'Hired',
// ]

interface ApplicationProps {
    dateTime: string;
    jobId: string;
    jobTitle: string;
    status: string;
}


export default function Application({ dateTime, jobId, status, jobTitle }: ApplicationProps) {
    return (<div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
        <p className="flex items-center gap-8 text-sm font-medium leading-none">
          <span className="">
            {dateTime}
          </span>
          <span className="text-muted-foreground">
              <Link href={`/jobs/jobId`} className="underline">
                    {jobTitle}
              </Link>
          </span>
          <Badge className="rounded-lg">
            {status}
          </Badge>
        </p>
        {jobId}
        <ComboboxDropdownMenu />
      </div>
    );
}
