import { Input } from "../ui/input";
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix: string;
}
export default function PrefixInput(
    { prefix, className, ...props }: InputProps) {
    return (
        <div className="has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-slate-950 has-[:focus-visible]:ring-offset-2 flex items-center h-10 rounded-md bg-white border border-slate-200 md:text-sm dark:bg-slate-950 dark:border-slate-800">
            <span className="text-muted px-3">{prefix}</span>
            <Separator orientation="vertical" className="h-full bg-slate-200 dark:bg-slate-800" />
            <Input
                className={cn("peer border-none bg-transparent py-0 rounded-l-none h-full focus-visible:ring-0 focus-visible:ring-offset-0", className)}
                {...props}
            />
        </div>
    );
}