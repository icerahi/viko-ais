"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "TEACHER")) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "TEACHER") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href={"/teacher"}>Teacher Dashboard</Link>{" "}
        </h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user.login}</span>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
