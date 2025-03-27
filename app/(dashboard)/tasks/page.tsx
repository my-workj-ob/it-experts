import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react"

export default function TasksPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your projects and tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            New Task
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search tasks..." className="pl-8" />
          </div>
          <Button variant="outline">My Tasks</Button>
          <Button variant="outline">All Projects</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
              To Do
              <span className="text-gray-500 text-sm font-normal">(4)</span>
            </h2>
            <Button variant="ghost" size="sm">
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((task) => (
              <Card key={task} className="shadow-sm">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-sm font-medium">Implement user authentication</CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Create login and registration forms with validation
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Jun 15</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>2 days left</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare size={12} />
                    <span>3</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Circle className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              In Progress
              <span className="text-gray-500 text-sm font-normal">(3)</span>
            </h2>
            <Button variant="ghost" size="sm">
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((task) => (
              <Card key={task} className="shadow-sm">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-sm font-medium">Design dashboard UI</CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Create wireframes and high-fidelity designs for the main dashboard
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Jun 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <Clock size={12} />
                      <span>Overdue</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare size={12} />
                    <span>5</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Completed
              <span className="text-gray-500 text-sm font-normal">(2)</span>
            </h2>
            <Button variant="ghost" size="sm">
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2].map((task) => (
              <Card key={task} className="shadow-sm opacity-70">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-sm font-medium line-through">Setup project repository</CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-through">
                    Initialize Git repository and setup project structure
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Jun 5</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle2 size={12} />
                      <span>Completed</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare size={12} />
                    <span>2</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

