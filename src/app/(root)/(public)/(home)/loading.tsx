import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="container">
      <div className="border border-color rounded-xl mx-auto max-w-[700px]">
          <div className="flex justify-between items-center p-4">
              <div>
                  <h1 className="text-xl font-bold">Jobs</h1>
                  <p className="text-sm">Search for jobs</p>
              </div>
              <div>
                <Skeleton className="h-10 w-[100px]" />
              </div>
          </div>
          <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="sm:flex-1">
                  <Skeleton className="h-12" />
                </div>
                <div>
                  <Skeleton className="h-12" />
                </div>
              </div>
              <Skeleton className="h-10 w-[150px] mt-4" />
          </div>
      </div>
      <div className="max-w-[900px] mx-auto mt-10 space-y-6">
        <ul className="space-y-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <li key={item}>
              <div className="bg-light-900 dark:bg-dark-300 border border-color p-0 rounded-md">
                <div className="flex items-center p-1 justify-between border-b border-color">
                  <Skeleton className="w-1/2 h-8" />
                  <Skeleton className="w-1/6 h-8" />
                </div>
                  <div className="flex items-center gap-8 p-4">
                    <div className="hidden rounded shadow dark:border dark:border-color sm:flex items-center justify-center w-[130px] h-[130px]">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <Skeleton className="h-10 w-3/4" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Loading;