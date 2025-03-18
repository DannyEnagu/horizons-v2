import JobList from "@/components/Jobs/JobList";
import SearchWrapper from "@/components/Jobs/SearchWrapper";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { fetchJobs, fetchLocation } from "@/server/actions/jobs.action";
import { PageURLProps } from "@/types";

export default async function Page(props: PageURLProps) {
    const searchParams = await props.searchParams;
    const userLocation = await fetchLocation();

    const { jobList, page, page_count } = await fetchJobs(
        {
            query: searchParams.query || "",
            location: searchParams.location || userLocation,
            level: searchParams.level || "",
            page: searchParams.page ? parseInt(searchParams.page) : 1,
        }
    ) || { jobList: [], page: 0, page_count: 0 };

    return (
        <>
            <section className="container">
                <SearchWrapper
                    title="Jobs"
                    description="Search for job openings"
                    isJobSearch
                />
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