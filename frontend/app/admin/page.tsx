"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AdminService } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const fetchData = async () => {
    try {
      const [data] = await Promise.all([AdminService.getDashboardInfo()]);
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Welcome to the Academic Information System</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <p className="px-4">
            Use the sidebar to manage students, teachers, groups, and subjects.
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.totalTeachers}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.totalStudents}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.totalSubjects}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.totalGroups}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
