import { Router } from "express";
import { authRoutes } from "./auth.route";
import { groupRoutes } from "./group.route";
import { studentRoutes } from "./student.route";
import { subjectRoutes } from "./subject.route";
import { subjectGroupRoutes } from "./subjectGroup.route";
import { userRoutes } from "./user.route";
import { gradeRoutes } from "./grade.route";

const router = Router();

const allRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/group", route: groupRoutes },
  { path: "/subject", route: subjectRoutes },
  { path: "/student", route: studentRoutes },
  { path: "/subject-group", route: subjectGroupRoutes },
  { path: "/grade", route: gradeRoutes },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
