import { Card } from "@/components/ui/card"

export default function DiscoverProjectDetailLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 bg-muted rounded-full mr-4" />
        <div className="h-8 bg-muted rounded w-48" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <div className="h-[400px] bg-muted rounded-t-lg" />
            <div className="p-6">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-5/6 mb-6" />

              <div className="h-10 bg-muted rounded w-full mb-4" />
              <div className="h-32 bg-muted rounded w-full" />
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 bg-muted rounded-full" />
                <div>
                  <div className="h-6 bg-muted rounded w-32 mb-1" />
                  <div className="h-4 bg-muted rounded w-24" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-4 bg-muted rounded w-24" />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="h-10 bg-muted rounded w-full" />
                <div className="h-10 bg-muted rounded w-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
