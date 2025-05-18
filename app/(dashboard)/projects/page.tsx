"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProjectCard from "@/components/project-card";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/create-axios";

interface Category {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  skills: string[];
}

export default function ProjectsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, refetch } = useQuery({
    queryKey: [
      "projects_",
      categoryFilter,
      statusFilter,
      skillsFilter,
      searchQuery,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter !== "all") {
        params.append("category", categoryFilter);
      }
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (skillsFilter) {
        params.append("skills", skillsFilter);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      const response = await axiosInstance.get(
        `/projects?${params.toString()}`
      );
      return response.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });

  console.log(categories);

  const handleApplyFilters = () => {
    refetch();
  };

  const handleResetFilters = () => {
    setCategoryFilter("all");
    setStatusFilter("all");
    setSkillsFilter("");
    setSearchQuery("");
    refetch();
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
            Projects
          </span>{" "}
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery) {
                  refetch(); // Agar enter bosilganda qidiruvni ishga tushirish kerak bo'lsa
                }
              }}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category?.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Recruiting">Recruiting</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input
                  placeholder="e.g. React, Python, AWS"
                  value={skillsFilter}
                  onChange={(e) => setSkillsFilter(e.target.value)}
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardContent className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => (window.location.href = "/projects/create")}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
