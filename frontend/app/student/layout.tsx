"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "STUDENT")) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "STUDENT") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href={"/student"}>Student Dashboard</Link>
        </h1>
        <div className="flex items-center gap-4">
          <span>
            Welcome, {user.login} ({(user as any)?.group?.name})
          </span>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-muted/20">{children}</main>
    </div>
  );
}
