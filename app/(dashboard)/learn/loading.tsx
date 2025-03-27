import { Skeleton } from "@/components/ui/skeleton"

export default function LearnLoading() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-10 w-80 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-96 w-full rounded-lg" />
              ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

