"use client";

import { Badge } from "@/components/ui/badge";
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
import { AdminService, Group, Subject } from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Settings, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const groupSchema = z.object({
  name: z.string().min(2),
});

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Manage Subjects Dialog State
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchData = async () => {
    try {
      const [groupsData, subjectsData] = await Promise.all([
        AdminService.getAllGroups(),
        AdminService.getAllSubjects(),
      ]);
      setGroups(groupsData);
      setSubjects(subjectsData);
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

  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    try {
      await AdminService.createGroup(values.name);
      setIsCreateOpen(false);
      form.reset();
      fetchData();
      toast.success("Group created successfully");
    } catch (error) {
      console.error("Failed to create group", error);
      toast.error("Failed to create group");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this group?")) {
      try {
        await AdminService.deleteGroup(id);
        fetchData();
        toast.success("Group deleted successfully");
      } catch (error) {
        console.error("Failed to delete group", error);
        toast.error("Failed to delete group");
      }
    }
  };

  const openManageDialog = (group: Group) => {
    setSelectedGroup(group);
    setSelectedSubjectId("");
    setIsManageOpen(true);
  };

  const handleAddSubject = async () => {
    if (!selectedGroup || !selectedSubjectId) return;
    try {
      await AdminService.assignSubjectToGroup(
        selectedGroup.id,
        parseInt(selectedSubjectId)
      );

      // Refresh data and update local state for immediate feedback if needed,
      // but fetchData is safer to get updated relations
      await fetchData();

      // Update selected group from the fresh data
      const updatedGroups = await AdminService.getAllGroups();
      const updatedGroup = updatedGroups.find(
        (g: Group) => g.id === selectedGroup.id
      );
      setSelectedGroup(updatedGroup || null);

      setSelectedSubjectId("");
      toast.success("Subject added to group");
    } catch (error: any) {
      console.error("Failed to assign subject", error);
      toast.error(error?.message);
    }
  };

  const handleRemoveSubject = async (subjectId: number) => {
    if (!selectedGroup) return;
    try {
      await AdminService.removeSubjectFromGroup(selectedGroup.id, subjectId);

      await fetchData();

      const updatedGroups = await AdminService.getAllGroups();
      const updatedGroup = updatedGroups.find(
        (g: Group) => g.id === selectedGroup.id
      );
      setSelectedGroup(updatedGroup || null);

      toast.success("Subject removed from group");
    } catch (error) {
      console.error("Failed to remove subject", error);
      toast.error("Failed to remove subject");
    }
  };

  console.log({ groups });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>Create a new student group.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="CS-101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Group
                </Button>
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
              <TableHead>Subjects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {group.subjectGroup?.map((sg: any) => (
                      <Badge key={sg?.subject?.id} variant="secondary">
                        {sg?.subject?.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openManageDialog(group)}
                    title="Manage Subjects"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(group.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Manage Subjects Dialog */}
      <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Subjects for {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Add or remove subjects for this group.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Add Subject Section */}
            <div className="flex gap-2 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Add Subject</label>
                <Select
                  value={selectedSubjectId}
                  onValueChange={setSelectedSubjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddSubject} disabled={!selectedSubjectId}>
                Add
              </Button>
            </div>

            {/* Current Subjects List */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Subjects</label>
              <div className="border rounded-md p-2 space-y-2 max-h-[200px] overflow-y-auto">
                {selectedGroup?.subjectGroup?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No subjects assigned.
                  </p>
                ) : (
                  selectedGroup?.subjectGroup?.map((sg: any) => (
                    <div
                      key={sg.subject?.id}
                      className="flex justify-between items-center bg-secondary/50 p-2 rounded text-sm"
                    >
                      <span>{sg.subject?.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveSubject(sg.subject.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
