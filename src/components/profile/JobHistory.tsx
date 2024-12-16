
// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs"
// import Application, { ApplicationProps } from "./Application";

// interface JobHistoryProps {
//     applications: ApplicationProps[] | undefined;
//     savedJobs: ApplicationProps[] | undefined;
// }

// export default function JobHistory({ applications, savedJobs }: JobHistoryProps
// ) {
//     console.log("Job Applications", applications);
//     console.log("Jobs Saved", savedJobs);
//     return (
//         <div className="mt-8">
//             <Tabs defaultValue="applications">
//                 <TabsList>
//                     <TabsTrigger value="applications">
//                         Applications
//                     </TabsTrigger>
//                     <TabsTrigger value="saved">
//                         Saved Jobs
//                     </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="applications" className="py-4">
//                     {applications
//                         ? applications.map((application, index) => (
//                             <Application
//                                 key={index}
//                                 dateTime={application.dateTime}
//                                 jobId={application.jobId}
//                                 jobTitle={application.jobTitle}
//                                 status={application.status}
//                             />
//                         ))
//                         : <p>
//                             You have not applied to any jobs yet.
//                         </p>
//                     }
//                 </TabsContent>
//                 <TabsContent value="saved" className="py-4">
//                     <Application
//                         dateTime="Friday, 12th March 2021 12:00 PM"
//                         jobId="1"
//                         jobTitle="Frontend Developer"
//                         status="saved"
//                     />
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }


import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Application, { ApplicationProps } from "./Application";

interface JobHistoryProps {
    applications: ApplicationProps[] | undefined;
    savedJobs: ApplicationProps[] | undefined;
}

export default function JobHistory({ applications, savedJobs }: JobHistoryProps
) {
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
                    {applications?.length
                        ? applications.map((application, index) => (
                            <Application
                                key={index}
                                dateTime={application.dateTime}
                                jobId={application.jobId}
                                jobTitle={application.jobTitle}
                                status={application.status}
                            />
                        ))
                        : <p className="text-center text-light400_light500 text-sm">
                            You have not applied to any jobs yet.
                        </p>
                    }
                </TabsContent>
                <TabsContent value="saved" className="py-4">
                    {savedJobs?.length
                        ? savedJobs.map((application, index) => (
                            <Application
                                key={index}
                                dateTime={application.dateTime}
                                jobId={application.jobId}
                                jobTitle={application.jobTitle}
                                status={application.status}
                                display="saved"
                            />
                        ))
                        : <p className="text-center text-light400_light500 text-sm">
                            You have not saved any jobs yet.
                        </p>
                    }
                </TabsContent>
            </Tabs>
        </div>
    );
}