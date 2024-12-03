import { User } from "@prisma/client";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function PersonalDetails(user: User) {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <UserAvatar
                    name="John Doe"
                    avatar="https://randomuser.me/api/portraits"
                    className="h-24 w-24 rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-semibold">John Doe</h2>
                    <p className="text-xs text-light400_light500 mb-1 mt-2">
                        johndoe@gmil.com
                    </p>
                    <p className="text-sm text-light400_light500">
                        Professional Title
                    </p>
                </div>
                <Button variant="secondary" size="sm" className="self-start sm:ml-auto">
                    Edit Profile
                </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="space-y-[1px]">
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Location:
                        </strong>
                        <span className="ml-2 text-xs">
                            City, Country
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Phone:
                        </strong>
                        <span className="ml-2 text-xs">
                            +123456789
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Gender:
                        </strong>
                        <span className="ml-2 text-xs">
                            Male
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Social:
                        </strong>
                        <span className="ml-2 text-xs">
                            Facebook, Twitter, LinkedIn
                        </span>
                    </p>
                </div>
                <Separator orientation="vertical" className="hidden sm:block h-[100px]" />
                <div className="w-3/4">
                    <h3 className="text-lg font-semibold">About</h3>
                    <p className="text-light400_light500 mt-2 paragraph-semibold">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nulla nec dui eget urna tincidunt aliquam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam nulla laudantium voluptate blanditiis quaerat ipsa, explicabo, assumenda totam iure, quo ipsam quae adipisci. Atque doloribus, enim ad neque repellendus nam?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam alias repellendus rerum expedita voluptates culpa distinctio delectus eaque fuga, officia quos suscipit velit praesentium fugiat dicta ipsum minima soluta ut?
                    </p>
                </div>
            </div>
        </>
    );
}