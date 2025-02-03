'use client';

import { useEffect, useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { getDashboardDataByEmployerId } from "@/server/actions/employer.action";

export default function StatCards() {
    const { getUser } = useKindeBrowserClient();
    const userId = getUser()?.id;
    const [stats, setStats] = useState<{
        postedJobs: number | undefined,
        activeJobs: number | undefined,
        applications: number | undefined,
        shortlisted: number | undefined
    }>({
        postedJobs: undefined,
        activeJobs: undefined,
        applications: undefined,
        shortlisted: undefined
    });

    
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { result } = await getDashboardDataByEmployerId(userId);
                setStats(result);
            } catch (error) {
                console.error(`❌ ${error} ❌`);
            }
        };
        fetchStats();
    }, [userId]);

    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <StatCard
                name="Posted Jobs"
                value={stats.postedJobs}
                icon="plus-circle"
            />
            <StatCard
                name="Active Jobs"
                value={stats.activeJobs}
                icon="briefcase"
            />
            <StatCard
                name="Applications"
                value={stats.applications}
                icon="list"
            />
            <StatCard
                name="Shortlisted"
                value={stats.shortlisted}
                icon="list-filter-plus"
            />
        </div>
    )
}

interface StatCardProp {
    name: string;
    value: number | undefined;
    icon: string
}

function StatCard({name, value, icon}: StatCardProp) {
    const zeroPrefix = (value: number) => value < 10 ? `0${value}` : value;
    return (
    <div className="relative">
        <div className="flex items-center gap-0 rounded-2xl bg-white dark:dark-gradient px-4 w-[200px] h-[85px] drop-shadow-lg z-20">
            <div className="flex flex-col gap-1">
                {value === undefined
                    ? <Skeleton className="w-7 h-8" />
                    : <span className="font-medium text-2xl">
                            {zeroPrefix(value as number)}
                        </span>
                }
                <span className="text-muted text-xs">
                    {name}
                </span>
            </div>
            <div className="flex items-center justify-center rounded-full bg-lime-500 w-10 h-10 ml-auto">
                <Image
                    src={`/icons/${icon}.svg`}
                    alt={`${name} icon`}
                    width={24}
                    height={24}
                    className="invert-colors"
                />
            </div>
        </div>
        <div className="absolute bottom-[-4] left-4 w-[170px] h-1 rounded-b-2xl z-[-5] border-b-4 border-white dark:border-color"/>
    </div>
    );
}