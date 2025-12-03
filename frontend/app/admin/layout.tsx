"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "ADMIN") {
    return <div>Loading...</div>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/students", label: "Students", icon: GraduationCap },
    { href: "/admin/teachers", label: "Teachers", icon: Users },
    { href: "/admin/groups", label: "Groups", icon: Layers },
    { href: "/admin/subjects", label: "Subjects", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-xl font-bold">
            <Link href={"/admin"}>Admin Panel</Link>
          </h1>
          <p className="text-sm text-slate-400">Welcome, {user.login}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                pathname === item.href
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button variant="destructive" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
