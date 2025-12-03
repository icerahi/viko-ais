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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminService, Group } from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Assignment Dialog State
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const fetchData = async () => {
    try {
      const [studentsData, groupsData] = await Promise.all([
        AdminService.getAllStudents(),
        AdminService.getAllGroups(),
      ]);
      setStudents(studentsData);
      setGroups(groupsData);
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

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      await AdminService.createUser({ ...values, role: "STUDENT" });
      setIsCreateOpen(false);
      form.reset();
      fetchData();
      toast.success("Student created successfully");
    } catch (error) {
      console.error("Failed to create student", error);
      toast.error("Failed to create student");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await AdminService.deleteUser(id);
        fetchData();
        toast.success("Student deleted successfully");
      } catch (error) {
        console.error("Failed to delete student", error);
        toast.error("Failed to delete student");
      }
    }
  };

  const openAssignDialog = (student: any) => {
    setSelectedStudent(student);
    setSelectedGroupId(student.group?.id?.toString() || "");
    setIsAssignOpen(true);
  };

  const handleAssignGroup = async () => {
    if (!selectedStudent || !selectedGroupId) return;

    try {
      await AdminService.assignStudentToGroup(
        selectedStudent.user.id,
        parseInt(selectedGroupId)
      );
      fetchData();
      setIsAssignOpen(false);
      toast.success("Group assigned successfully");
    } catch (error) {
      console.error("Failed to assign group", error);
      toast.error("Failed to assign group");
    }
  };

  // Auto-generate password from last name
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    form.setValue("lastName", lastName);
  };

  // Auto-generate login from first name
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    form.setValue("firstName", firstName);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Create a new student account.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Imran"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFirstNameChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Hasan"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleLastNameChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Student
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.user.id}>
                <TableCell>{student.user.id}</TableCell>
                <TableCell>{student.user.firstName}</TableCell>
                <TableCell>{student.user.lastName}</TableCell>
                <TableCell>{student.user.login}</TableCell>
                <TableCell>
                  {student.group ? student.group.name : "No Group"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openAssignDialog(student)}
                    title="Assign Group"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(student.user.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assign Group Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Group</DialogTitle>
            <DialogDescription>
              Assign a group to {selectedStudent?.user.firstName}{" "}
              {selectedStudent?.user.lastName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Group
              </label>
              <Select
                value={selectedGroupId}
                onValueChange={setSelectedGroupId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAssignGroup} className="w-full">
              Save Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
