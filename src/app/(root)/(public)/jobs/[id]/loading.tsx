import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (<div className="container md:grid grid-cols-[2fr_1fr] gap-8">
    <div className="border-b md:border-b-0 md:border-r border-color">
      <header className="px-4">
          <Skeleton className="h-10 w-3/4 mb-8" />
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-20" />
              <span className="w-2 h-2 rounded-full background-light200_dark400" />
              <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex flex-col gap-2 mt-2">
              <span className="text-light400_light500 text-xs">Posted on 
                  <Skeleton className="h-4 w-40" />
              </span>
              <span className="text-light400_light500 text-xs">
                  Valid till <Skeleton className="h-4 w-40" />
              </span>
          </div>
      </header>
      <Separator className="my-4" />
      <div className="pb-8 px-4">
          <h2 className="h2-bold text-dark100_light900 mb-8">Description</h2>
          <div className="text-light400_light500">
              <Skeleton className="h-[500px] w-full" />
          </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex flex-col gap-4 sm:w-[200px] mx-auto mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
      </div>
    </div>
</div>);
};

export default Loading;