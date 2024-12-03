'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getUpdatedParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    // onPageChange: (page: number) => void;
}

export default function PaginationComponent({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // const [currentPage, setCurrentPage] = useState(1);

    const handleUpdateParams = (value: number | string) => {
        const newUrl = getUpdatedParams(value as string, 'page', searchParams.toString());
        router.push(newUrl, { scroll: false });
    }

    // useEffect(() => {
    //     const page = searchParams.get('page');
    //     setCurrentPage(page ? parseInt(page) : 1);
    // }, [searchParams]);

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 &&
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handleUpdateParams(currentPage - 1)} />
                    </PaginationItem>
                }
                {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => {
                    const page = i + 1;
                    const isCurrent = page === currentPage;
                    return (
                        <PaginationItem
                            key={page}
                            onClick={() => handleUpdateParams(page)}
                        >
                            <PaginationLink className={`cursor-pointer ${isCurrent ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                {totalPages > 5 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {totalPages > currentPage &&
                    <PaginationItem>
                        <PaginationNext onClick={() => handleUpdateParams(currentPage + 1)} className="cursor-pointer" />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    );
}

