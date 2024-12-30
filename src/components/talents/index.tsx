"use client";
import { useEffect, useState } from "react";
import TalentCard, { LoadingTalentCard, TalentCardProps } from "./TalentCard";
import { getTalents } from "@/server/actions/talent.action";
import PaginationComponent from "../shared/PaginationComponent";
import { useSearchParams } from "next/navigation";
import { JOB_LEVELS_MAP } from "@/constants/global";

export default function Talents() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const query = searchParams.get('query') || '';
    const location = searchParams.get('location') || '';
    const level = searchParams.get('level') || '';


    const [talents, setTalents] = useState<TalentCardProps[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

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
                    />
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