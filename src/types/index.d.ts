export type Job = {
    id: string | number;
    title: string;
    description: string;
    location: string[];
    country: string[];
    employmentType: string[];
    company: string;
    companyLogo: string;
    createdAt: string;
    postedAt: string;
    companyUrl: string;
    companyDescription: string;
    url: string;
    validUntil: string;
    source: string;
};

export type JobFilterParams = {
    title_filter?: string | null;
    location_filter?: string | null;
    type_filter?: string[] | 'CONTRACTOR' | 'FULL_TIME' | 'INTERN' | 'OTHER' | 'PART_TIME' | 'TEMPORARY' | 'VOLUNTEER' | null;
    remote?: boolean | null;
    page?: number | null;
};

export type Country = {
    name: {
      common: string;
    };
}

export interface PageURLProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}