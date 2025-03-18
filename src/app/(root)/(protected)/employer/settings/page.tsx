import AutoConfirmationEmail from "@/components/dashboard/settings/AutoConfirmationEmail";
import PageTitle from "@/components/employer/PageTitle";

export default function Page() {
    return (
        <div>
            <PageTitle>
                Settings
            </PageTitle>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
                <AutoConfirmationEmail />
            </div>
        </div>
    );
}