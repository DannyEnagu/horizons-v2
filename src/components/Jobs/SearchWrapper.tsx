import { fetchCountries } from "@/server/actions/jobs.action";
import LocationPicker from "../LocationPicker";
import Filters from "./Filters";
import ClearFilter from "./ClearFilter";
import SearchBar from "../search/SearchBar";


interface SearchWrapperProps {
    title: string;
    description: string;
    isJobSearch?: boolean;
}

export default async function SearchWrapper({ title, description, isJobSearch }: SearchWrapperProps) {
    const counties =  await fetchCountries();
    return (
        <div className="border border-color rounded-xl mx-auto max-w-[700px]">
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-xl font-bold">
                        {title}
                    </h1>
                    <p className="text-sm text-muted">
                        {description}
                    </p>
                </div>
                <div>
                    <ClearFilter />
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="sm:flex-1">
                        <SearchBar placeholder="Search here"  />
                    </div>
                    <div>
                        <LocationPicker
                            counties={counties}
                            placeholder={isJobSearch
                                ? "Select Country"
                                : "eg. Lagos, Nigeria"}
                            isSelectInput={isJobSearch}
                        />
                    </div>
                </div>
                <Filters />
            </div>
        </div>
    );
}