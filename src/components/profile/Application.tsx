"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge";

import type { Application, ApplicationStatus } from "@prisma/client";
import Link from "next/link"
import { ComboboxDropdownMenu } from "../shared/ComboboxDropdownMenu";
import dayjs from "dayjs";

export interface ApplicationProps {
  dateTime: string;
  jobId: string;
  jobTitle: string;
  status: string | ApplicationStatus;
  display?: 'applications' | 'saved';
}


export default function Application({ dateTime, jobId, status, jobTitle, display='applications' }: ApplicationProps) {
  const formatDateTime = (dateTime: string) => {
      // Expected format : "Friday, 12 March 2021 12:00 PM"
      return dayjs(dateTime).format("dddd, DD MMMM YYYY h:mm A");
    }
    return (<div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 text-sm font-medium leading-none">
          <span>
            {formatDateTime(dateTime)}
          </span>
          <span className="text-muted-foreground">
              <Link href={`/jobs/${jobId}`} className="underline">
                {jobTitle}
              </Link>
          </span>
          <Badge className="rounded-lg text-center self-start">
            {status}
          </Badge>
        </div>
        <ComboboxDropdownMenu
          itemId={jobId}
          label={status}
          showLabels={display === 'applications'}
          setLabel={() => {}}
          onDelete={() => {}}
        />
      </div>
    );
}
