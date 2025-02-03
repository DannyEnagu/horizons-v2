import LineGraph from "@/components/dashboard/LineGraph";
import PostedJobs from "@/components/dashboard/PostedJobs";
import StatCards from "@/components/dashboard/StatCards";
import PageTitle from "@/components/employer/PageTitle";


export default function Page() {
    return (
        <div>
            <PageTitle>
                Overview
            </PageTitle>

            <StatCards />
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_,300px] gap-8">
                <LineGraph />
                <PostedJobs />
            </div>
        </div>
    );
}