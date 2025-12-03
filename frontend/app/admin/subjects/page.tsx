"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AdminService, Subject } from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const subjectSchema = z.object({
  name: z.string().min(2),
  teacherId: z.string().optional(),
});

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Assignment Dialog State
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      teacherId: undefined,
    },
  });

  const fetchData = async () => {
    try {
      const [subjectsData, usersData] = await Promise.all([
        AdminService.getAllSubjects(),
        AdminService.getAllUsers(),
      ]);
      setSubjects(subjectsData);
      setTeachers(usersData.filter((u: any) => u.role === "TEACHER"));
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof subjectSchema>) => {
    try {
      await AdminService.createSubject({
          name: values.name,
          teacherId: values.teacherId ? parseInt(values.teacherId) : undefined
      });
      setIsCreateOpen(false);
      form.reset();
      fetchData();
      toast.success("Subject created successfully");
    } catch (error) {
      console.error("Failed to create subject", error);
      toast.error("Failed to create subject");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      try {
        await AdminService.deleteSubject(id);
        fetchData();
        toast.success("Subject deleted successfully");
      } catch (error) {
        console.error("Failed to delete subject", error);
        toast.error("Failed to delete subject");
      }
    }
  };

  const openAssignDialog = (subject: Subject) => {
      setSelectedSubject(subject);
      setSelectedTeacherId(subject.teacherId?.toString() || "");
      setIsAssignOpen(true);
  };

  const handleAssignTeacher = async () => {
      if (!selectedSubject) return;
      try {
          await AdminService.updateSubject(selectedSubject.id, { teacherId: selectedTeacherId ? parseInt(selectedTeacherId) : null });
          fetchData();
          setIsAssignOpen(false);
          toast.success("Teacher assigned successfully");
      } catch (error) {
          console.error("Failed to assign teacher", error);
          toast.error("Failed to assign teacher");
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Subjects</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Subject</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>
                Create a new subject and optionally assign a teacher.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mathematics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Teacher" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                              {teacher.firstName} {teacher.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Create Subject</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.id}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>
                  {subject.teacher ? `${subject.teacher.user.firstName} ${subject.teacher.user.lastName}` : "No Teacher"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openAssignDialog(subject)} title="Assign Teacher">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(subject.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assign Teacher Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Teacher</DialogTitle>
            <DialogDescription>
              Assign a teacher to {selectedSubject?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Teacher</label>
              <Select
                value={selectedTeacherId}
                onValueChange={setSelectedTeacherId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.firstName} {teacher.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAssignTeacher} className="w-full">
              Save Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
