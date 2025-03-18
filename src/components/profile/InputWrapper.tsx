import { cn } from "@/lib/utils";
import { Label } from "../ui/label";


export default function InputWrapper({
    children,
    label,
    labelFor,
    required,
    asCol,
    optionalText,
}: {
    label: string;
    labelFor: string;
    optionalText?: string;
    required?: boolean;
    asCol?: boolean;
    children: React.ReactNode
}) {
    return (
        <div className={cn("flex gap-2",
            asCol ? "flex-col md:w-3/4 md:mx-auto" : "flex-col sm:flex-row sm:items-start sm:justify-between"
        )}>
            <Label htmlFor={labelFor}>
                <span className="flex items-center gap-1">
                    <span>{label}</span>
                    {required && <span className="text-red-500 text-sm">*</span>}
                </span>
                {optionalText && (
                    <span className="text-muted text-xs mt-1 mb-2"> {optionalText}
                    </span>
                )}
            </Label>
            <div>
                {children}
            </div>
        </div>
    );
}