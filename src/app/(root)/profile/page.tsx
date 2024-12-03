import JobHistory from "@/components/profile/JobHistory";
import PersonalDetails from "@/components/profile/PersonalDetails";
import ProfessionalDetails from "@/components/profile/ProfessionalDetails";
import BackButton from "@/components/search/BackButton";
import Divider from "@/components/shared/Divider";

export default function ProfilePage() {
  return (
    <div className="profile-wrapper">
      <div className="border-2 border-color p-6 background-light900_dark300 rounded-md space-y-8">
        <header>
            <Divider>
                <BackButton title="Back" />
                <h1 className="text-2xl font-semibold">
                    My Profile
                </h1>
            </Divider>
        </header>
        <section>
            {/* Profile Details */}
            <PersonalDetails user={{}} />
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Professional Details
                </h2>
            </Divider>
            {/* Professional Details */}
            <ProfessionalDetails user={{}} />
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Job History
                </h2>
            </Divider>
            {/* Job History */}
            <JobHistory user={{}} />
        </section>
      </div>
    </div>
  );
}