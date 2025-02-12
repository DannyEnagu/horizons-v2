import { Job } from "@prisma/client";

export interface JobAPIResponse extends Job {
    refs: {
        landing_page: string;
    };
    company: {
        name: string;
    };
    locations: {
        name: string;
    }[];
    categories: {
        name: string;
    }[];
    levels: {
        name: string;
    }[];
    employmentTypes: string;
    tags: string;
    contents: string;
    name: string;
    publication_date: string;
    createdAt: string;
    updatedAt: string;
    employerId: string;
    companyLogo: string;
    descriptionType : string;
}

type SaveJobType = {
    job: Job;
    userId: string;
}