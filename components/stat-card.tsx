import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  number: string
  label: string
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <p className="text-3xl md:text-4xl font-bold text-primary">{number}</p>
        <p className="text-sm md:text-base text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

