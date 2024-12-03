import React from "react";
import { Separator } from "../ui/separator";


export default function Divider({children}: {children: React.ReactNode}) {
    return (
        <div className="flex items-center gap-4">
            {children}
            <Separator className="flex-1" />
        </div>
    );
}