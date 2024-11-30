import { fetchCountries } from "@/server/actions/jobs.action";
import LocationFilter from "../LocationFilter";
import JobFilters from "./JobFilters";
import JobSearch from "./JobSearch";
import ClearFilter from "./ClearFilter";


export default async function JobSearchWrapper() {
    const counties =  await fetchCountries();
    return (
        <div className="border border-color rounded-xl mx-auto max-w-[700px]">
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-xl font-bold">Jobs</h1>
                    <p className="text-sm">Search for jobs</p>
                </div>
                <div>
                    <ClearFilter />
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="sm:flex-1">
                        <JobSearch />
                    </div>
                    <div>
                        <LocationFilter counties={counties} />
                    </div>
                </div>
                <JobFilters />
            </div>
        </div>
    );
}