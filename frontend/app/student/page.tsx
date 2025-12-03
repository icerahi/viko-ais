"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Grade, StudentService, Subject } from "@/services/student.service";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsData, gradesData] = await Promise.all([
          StudentService.getMySubjects(),
          StudentService.getMyGrades(),
        ]);
        setSubjects(subjectsData);
        setGrades(gradesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGradeForSubject = (subjectId: number) => {
    const grade = grades.find((g) => g.subjectId === subjectId);
    return grade ? grade.value : "N/A";
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(subjects);
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">My Grades</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map(({ subject }: any) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>
                  {subject.teacher
                    ? `${subject.teacher.user.firstName} ${subject.teacher.user.lastName}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      getGradeForSubject(subject.id) === "N/A"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {getGradeForSubject(subject.id)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
