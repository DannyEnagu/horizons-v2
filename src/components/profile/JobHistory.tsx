
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { User } from "@prisma/client";
import Application from "./Application";

export default function JobHistory(user: User) {
    return (
        <div className="mt-8">
            <Tabs defaultValue="applications">
                <TabsList>
                    <TabsTrigger value="applications">
                        Applications
                    </TabsTrigger>
                    <TabsTrigger value="saved">
                        Saved Jobs
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="applications" className="py-4">
                    <Application
                        dateTime="Friday, 12th March 2021 12:00 PM"
                        jobId="1"
                        jobTitle="Visual Designer"
                        status="Pending"
                    />
                    <Application
                        dateTime="Friday, 12th March 2021 12:00 PM"
                        jobId="1"
                        jobTitle="Visual Designer"
                        status="Pending"
                    />
                    <Application
                        dateTime="Friday, 12th March 2021 12:00 PM"
                        jobId="1"
                        jobTitle="Visual Designer"
                        status="Pending"
                    />
                </TabsContent>
                <TabsContent value="saved" className="py-4">
                    <Application
                        dateTime="Friday, 12th March 2021 12:00 PM"
                        jobId="1"
                        jobTitle="Frontend Developer"
                        status="saved"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}