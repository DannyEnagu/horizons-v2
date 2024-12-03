import JobList from "@/components/Jobs/JobList";
import JobSearchWrapper from "@/components/Jobs/JobSearchWrapper";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { fetchJobs, fetchLocation } from "@/server/actions/jobs.action";
import { JobFilterParams, PageURLProps } from "@/types";

export default async function Page(props: PageURLProps) {
    // const params = await props.params
    const searchParams = await props.searchParams;
    const userLocation = await fetchLocation();

    const { jobList, page, page_count } = await fetchJobs({
        title_filter: searchParams.title,
        location_filter: searchParams.location ? searchParams.location : userLocation,
        remote: searchParams.isRemote === 'true',
        type_filter: searchParams.type as JobFilterParams['type_filter'],
        page: parseInt(searchParams.page as string) || 0
    }) || { jobList: [], page: 0, page_count: 0 };

    return (
        <>
            <section className="container">
                <JobSearchWrapper />
            </section>
            <section className="container mt-20">
                <JobList jobs={jobList} />
            </section>
            <section className="container mt-20">
                {/* Pagination */}
                {jobList.length > 0 && <PaginationComponent totalPages={page_count} currentPage={page} />}
            </section>
        </>
    );
}