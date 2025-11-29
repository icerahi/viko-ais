import { Router } from "express";
import { authRoutes } from "./auth.route";
import { userRoutes } from "./user.route";

const router = Router();

const allRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
