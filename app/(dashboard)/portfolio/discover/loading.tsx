import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DiscoverLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="h-8 bg-muted rounded w-48 mb-2" />
          <div className="h-4 bg-muted rounded w-64" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-10 bg-muted rounded flex-1" />
        <div className="h-10 bg-muted rounded w-full md:w-[180px]" />
        <div className="h-10 bg-muted rounded w-full md:w-[180px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg" />
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
