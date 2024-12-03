import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { User } from "@prisma/client";

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
                <TabsContent value="applications" className="px-8 py-4">
                    Applications Table
                </TabsContent>
                <TabsContent value="saved" className="px-8 py-4">
                    Saved Jobs Table
                </TabsContent>
            </Tabs>
        </div>
    );
}