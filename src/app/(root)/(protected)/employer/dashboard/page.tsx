import LineGraph from "@/components/dashboard/LineGraph";
import PostedJobs from "@/components/dashboard/PostedJobs";
import StatCards from "@/components/dashboard/StatCards";


export default function Page() {
    return (
        <div>
            <h1 className="mt-4 mb-16 font-bold text-2xl">
                Overview
            </h1>

            <StatCards />
            {/* TODO: Stream the Graph */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_,300px] gap-8">
                <LineGraph />
                <PostedJobs />
            </div>
        </div>
    );
}