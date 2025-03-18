import AdminProfile from "@/components/dashboard/profile/AdminProfile";
import PageTitle from "@/components/employer/PageTitle";

export default function Page() {
    return (
        <div>
            <PageTitle>
                Profile
            </PageTitle>
            
            <div className="mt-8">
                <AdminProfile />
            </div>
        </div>
    );
}
