"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subject, TeacherService } from "@/services/teacher.service";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await TeacherService.getMySubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">My Subjects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subject ID: {subject.id}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subject.name}</div>
              <div className="mt-4">
                <Link href={`/teacher/subjects/${subject.id}`}>
                  <Button className="w-full">Manage Grades</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {subjects.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">
            No subjects assigned.
          </div>
        )}
      </div>
    </div>
  );
}
