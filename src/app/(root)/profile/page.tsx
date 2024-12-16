import JobHistory from "@/components/profile/JobHistory";
import PersonalDetails from "@/components/profile/PersonalDetails";
import ProfessionalDetails from "@/components/profile/ProfessionalDetails";
import BackButton from "@/components/search/BackButton";
import Divider from "@/components/shared/Divider";
import { getUsersByKindeId } from "@/server/actions/user.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getJobSeekerProfile } from "@/server/actions/jobs.action";
import { JobSeeker } from "@prisma/client";
import EditProfileSheet from "@/components/profile/EditProfileSheet";
import { SOCIAL_PLATFORMS } from "@/constants/global";

export default async function ProfilePage() {
    const {getUser} = getKindeServerSession();
    const kindeUser = await getUser();
    const user = await getUsersByKindeId(kindeUser?.id);
    if (!user) {
        // Handle the case where user is null
        return <div>User not found</div>;
    }
    const { result } = await getJobSeekerProfile(user.id);
    const {
        applications,
        savedJobs,
        experiences,
        socialProfiles,
        ...otherDetails
    } = result ?? {};

    const socialMediaLinks = SOCIAL_PLATFORMS.map((platform) => {
        const link = socialProfiles?.find((item) => item.platform === platform.label);

        return {
            platform: platform.label,
            url: platform.url,
            username: link
                ? link?.url
                    .split("/")[link?.url.split("/").length - 1]
                : "",
        };
    });
    const userProps = {
        firstName: user?.fullName.split(" ")[0],
        lastName: user?.fullName.split(" ")[1],
        email: user?.email,
        phone: result?.phone || "",
        location: result?.location || "",
        gender: result?.gender || "",
        avatar: user?.avatar || "",
        socials: socialMediaLinks,
    };
    const profile = {
        headline: result?.headline || "",
        bio: result?.bio || "",
        skills: result?.skills,
        jobSeekerId: result?.id
    };
    const workExperiences = experiences?.map((item) => ({
        id: item?.id,
        company: item?.company,
        designation: item?.designation,
        jobType: item?.jobType || '',
        term: item?.term,
        summary: item?.summary || '',
    }));
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
        {/* Profile Details */}
        <section className="relative">
            <div className="absolute top-0 right-0">
                <EditProfileSheet
                    totalYearsExperience={result?.totalYearsExperience}
                    profile={profile}
                    userId={user.id}
                    user={userProps}
                    experiences={workExperiences}
                />
            </div>
            <PersonalDetails
                user={user}
                otherDetails={otherDetails as JobSeeker}
                socialLinks={socialProfiles}
            />
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Professional Details
                </h2>
            </Divider>
            {/* Professional Details */}
            <ProfessionalDetails
                totalYearsExperience={result?.totalYearsExperience}
                skills={result?.skills}
                experiences={experiences}
            />
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Job History
                </h2>
            </Divider>
            {/* Job History */}
            <JobHistory
                applications={applications}
                savedJobs={savedJobs}
            />
        </section>
      </div>
    </div>
  );
}