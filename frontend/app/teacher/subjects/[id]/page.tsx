"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Grade, Student, TeacherService } from "@/services/teacher.service";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SubjectGradesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const subjectId = parseInt(id);
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingGrade, setEditingGrade] = useState<{ [key: number]: number }>(
    {}
  ); // studentId -> value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, gradesData] = await Promise.all([
          TeacherService.getStudentsBySubject(subjectId),
          TeacherService.getGradesBySubject(subjectId),
        ]);
        setStudents(studentsData[0].students || []);
        setGrades(gradesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [subjectId]);

  const handleGradeChange = (studentId: number, value: string) => {
    setEditingGrade({ ...editingGrade, [studentId]: parseFloat(value) });
  };

  const handleSaveGrade = async (studentId: number) => {
    const value = editingGrade[studentId];
    if (isNaN(value)) return;

    try {
      // Check if grade exists
      const existingGrade = grades.find(
        (g) => g.studentId === studentId && g.subjectId === subjectId
      );

      if (existingGrade) {
        await TeacherService.updateGrade(existingGrade.id, value);
        // Update local state
        setGrades(
          grades.map((g) => (g.id === existingGrade.id ? { ...g, value } : g))
        );
      } else {
        const newGrade = await TeacherService.createGrade({
          studentId,
          subjectId,
          value,
        });
        // Update local state
        setGrades([...grades, newGrade.data]); // API returns { data: Grade } usually? Check service.
      }
      toast.success("Grade saved!");
    } catch (error) {
      console.error("Failed to save grade", error);

      toast.error("Failed to save grade");
    }
  };

  const getGradeValue = (studentId: number) => {
    if (editingGrade[studentId] !== undefined) {
      return editingGrade[studentId];
    }
    const grade = grades.find(
      (g) => g.studentId === studentId && g.subjectId === subjectId
    );
    return grade ? grade.value : "";
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(students);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Grades</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length !== 0 ? (
              students.map((student, index) => (
                <TableRow key={student.userId ?? index}>
                  <TableCell>{student.userId}</TableCell>
                  <TableCell>
                    {student.user?.firstName} {student.user?.lastName}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-24"
                      value={getGradeValue(student.userId)}
                      onChange={(e) =>
                        handleGradeChange(student.userId, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleSaveGrade(student.userId)}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>No student enrolled yet!</p>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
