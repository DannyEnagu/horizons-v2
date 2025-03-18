import BackButton from '@/components/search/BackButton';
import Divider from '@/components/shared/Divider';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="profile-wrapper">
      <div className="border-2 border-color p-6 background-light900_dark300 rounded-md space-y-8">
        <header>
            <Divider>
                <BackButton title="Back" />
                <h1 className="text-2xl font-semibold">
                    My Profile
                </h1>
            </Divider>
        </header>
        <section>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20 my-2" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="space-y-[1px]">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20 my-2" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Professional Details
                </h2>
            </Divider>
            <div className="mt-6 relative">
                <div className="mt-4 space-y-8">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                    <div className="my-8">
                        <strong className="text-light400_light500 text-sm">
                            Work Experience:
                        </strong>
                        <span className="ml-2 text-xs">
                            <Skeleton className="h-4 w-20" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <Divider>
                <h2 className="text-xl font-semibold">
                    Job History
                </h2>
            </Divider>
            <div className="p-4">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 gap-4 p-1">
                    <span className="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50 rounded-sm p-1 px-2">Applications</span>
                    <span>Saved Jobs</span>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </section>
      </div>
    </div>);
};

export default Loading;