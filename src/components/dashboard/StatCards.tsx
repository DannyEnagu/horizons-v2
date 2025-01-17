import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function StatCards() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <StatCard
                name="Posted Jobs"
                value={7}
                icon="plus-circle"
            />
            <StatCard
                name="Active Jobs"
                value={3}
                icon="briefcase"
            />
            <StatCard
                name="Applications"
                value={20}
                icon="list"
            />
            <StatCard
                name="Shortlisted"
                value={150}
                icon="list-filter-plus"
            />
        </div>
    )
}

interface StatCardProp {
    name: string;
    value: string | number,
    icon: string
}

function StatCard({name, value, icon}: StatCardProp) {
    const zeroPrefix = (value: number) => value < 10 ? `0${value}` : value;
    return (
    <div className="relative">
        <div className="flex items-center gap-0 rounded-2xl bg-white dark:dark-gradient px-4 w-[200px] h-[85px] drop-shadow-lg z-20">
            <div className="flex flex-col gap-1">
                {value === ""
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