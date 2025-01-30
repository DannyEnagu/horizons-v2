"use client";
import { useEffect, useState } from "react";
import TalentCard, { LoadingTalentCard, TalentCardProps } from "./TalentCard";
import { getTalents } from "@/server/actions/talent.action";
import PaginationComponent from "../shared/PaginationComponent";
import { useSearchParams } from "next/navigation";
import { JOB_LEVELS_MAP } from "@/constants/global";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import UserAvatar from "../shared/UserAvatar";
import Skills from "../shared/Skills";
import { Button } from "../ui/button";

export default function Talents() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const query = searchParams.get('query') || '';
    const location = searchParams.get('location') || '';
    const level = searchParams.get('level') || '';


    const [talents, setTalents] = useState<TalentCardProps[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const topSkills = (skills: string[]) => skills.slice(0, 3);

    useEffect(() => {
        async function fetchTalents() {
            setTalents([]);
            setLoading(true);
            // fetch talents
            const params = {
                query,
                location,
                level: JOB_LEVELS_MAP[level as keyof typeof JOB_LEVELS_MAP],
                page
            }
            const filteredParams = Object.fromEntries(  
                Object.entries(params).filter(([, value]) => value !== '')  
            );
            const res = await getTalents(filteredParams);
            if (res.isSuccessful) {
                setTalents(res.result);
                setTotalPages(res.totalPages);
            }
            setLoading(false);
        }
        fetchTalents();
    }, [page, query, location, level]);


    return (
        <>
            <div className="grid-dynamic gap-4">
                {(talents.length > 0 && !loading) && talents.map((talent, index) => (
                    <TalentCard
                        key={index}
                        profile={talent?.profile}
                        user={talent?.user}
                        workExperience={talent?.workExperience}
                        socials={talent?.socials}
                    >
                        <Card className="cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center justify-center">
                                    <div className="p-[7px] rounded-full background-light400_light500">
                                        <UserAvatar
                                            name={talent.user.fullName}
                                            avatar={talent.user.avatar}
                                            className="h-[120px] sm:h-[150px] w-[120px] sm:w-[150px]"
                                        />
                                    </div>
                                </div>
                                <CardTitle className="text-center space-y-2 !mt-4">
                                    <p>{talent.user.fullName}</p>
                                    <p className="text-muted text-xl">{talent.profile.headline}</p>
                                </CardTitle>
                                <CardDescription className="text-center text-muted sm:leading-6">
                                    {talent.profile.bio}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h3>Top Skills</h3>
                                <Skills skills={topSkills(talent?.profile.skills)} />
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="block w-full">
                                    View Profile
                                </Button>
                            </CardFooter>
                        </Card>
                    </TalentCard>
                ))}
                {loading && (<>
                    <LoadingTalentCard />
                    <LoadingTalentCard />
                    <LoadingTalentCard />
                    <LoadingTalentCard />
                </>)}
            </div>
            {talents.length === 0 && !loading && (
                <p className="text-center text-light400_light500 text-sm">No Talent found.</p>
            )}
            {totalPages > 1 && 
                <div className="mt-20">
                    {/* Pagination */}
                    <PaginationComponent totalPages={totalPages} currentPage={page} />
                </div>
            }
        </>
    );
}