import { Experience } from "@prisma/client";
import Skills from "../shared/Skills";
interface ProfessionalDetailsProps {
    experiences: Experience[] | undefined;
    skills: string[] | undefined;
    totalYearsExperience: number | null | undefined;
}

export default function ProfessionalDetails(
    { experiences, skills, totalYearsExperience}: ProfessionalDetailsProps
) {
    return (
        <div className="mt-6">
            <div className="mt-4 space-y-8">
                {experiences?.map((item) => (
                    <div key={item?.id} className="flex items-center gap-8">
                        <p className="flex flex-col gap-4">
                            <strong className="text-xs">
                                {item?.designation}
                            </strong>
                            <span className="text-light400_light500 text-sm">
                                {item?.company}
                            </span>
                        </p>
                        <p className="flex flex-col gap-4">
                            <strong className="text-xs">Term</strong>
                            <span className="text-light400_light500 text-sm">
                                {item?.term}
                            </span>
                        </p> 
                    </div>
                ))}
                {experiences?.length === 0 && (<p className="text-center text-light400_light500 text-sm">No Work Experience yet.</p>)}
            </div>
            <p className="my-4">
                <strong className="text-light400_light500 text-sm">
                    Work Experience:
                </strong>
                <span className="ml-2 text-xs">
                    {`${totalYearsExperience ?  totalYearsExperience + " years" : 'N/A'}`}
                </span>
            </p>
            <p>
                <strong className="text-light400_light500 text-sm">
                    Skills:
                </strong>
                {skills?.length === 0 && <span className="ml-2 text-xs">N/A</span>}
                <Skills skills={skills} />
            </p>
        </div>
    );
}