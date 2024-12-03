import { User } from "@prisma/client";
import { Button } from "../ui/button";

export default function ProfessionalDetails(user: User) {
    return (
        <div className="mt-6 relative">
            <div className="mt-4 space-y-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-8">
                        <p className="flex flex-col gap-4">
                            <strong className="text-xs">Designation</strong>
                            <span className="text-light400_light500 text-sm">
                                Visual Designer
                            </span>
                        </p>
                        <p className="flex flex-col gap-4">
                            <strong className="text-xs">Term</strong>
                            <span className="text-light400_light500 text-sm">
                                March 2020 - Present
                            </span>
                        </p> 
                    </div>
                ))}
            </div>
            <p className="my-8">
                <strong className="text-light400_light500 text-sm">
                    Work Experience:
                </strong>
                <span className="ml-2 text-xs">
                    5 years
                </span>
            </p>
            <Button variant="secondary" size="sm" className="relative sm:absolute top-0 right-0">
                Edit Profile
            </Button>
        </div>
    );
}