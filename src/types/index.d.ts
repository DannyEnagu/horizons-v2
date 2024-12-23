export type JobFilterParams = {
    query?: string | null;
    location?: string | null;
    level?: string | null;
    page?: number | null;
};

export type Country = {
    name: string;
}

export interface PageURLProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}