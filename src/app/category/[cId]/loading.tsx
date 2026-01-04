import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          
          <div className="flex items-baseline gap-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-1.5 w-24 rounded-full mt-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article Skeleton */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-2 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          
          <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gray-200">
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4 w-full">
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-14 w-48 rounded-full hidden md:block" />
            </div>
          </div>
        </section>

        {/* News Grid Skeleton */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-2 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative h-96 w-full rounded-3xl overflow-hidden bg-gray-200">
                <div className="absolute top-4 left-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
