import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Back Button Skeleton */}
          <div className="absolute top-8 left-4 sm:left-8 flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-6 w-16 bg-gray-800 hidden sm:block" />
          </div>

          <div className="space-y-6">
            {/* Metadata Pills Skeleton */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-8 w-24 rounded-full bg-gray-800" />
              <Skeleton className="h-8 w-32 rounded-full bg-gray-800" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 max-w-4xl">
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-3/4 bg-gray-800" />
            </div>

            {/* Views Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
              <Skeleton className="h-5 w-20 bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Card Skeleton */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          {/* Share Bar Skeleton */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          {/* Body Text Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="h-8" /> {/* Spacer */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Tags Skeleton */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
