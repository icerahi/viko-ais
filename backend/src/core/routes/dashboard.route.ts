import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { DashboardRepository } from "../../infrastructure/repositories/dashboard.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { DashboardController } from "../controllers/dashboard.controller";
import { DashboardService } from "../services/dashboard.service";

const router = Router();
const dashboardRepo = new DashboardRepository();
const dashboardService = new DashboardService(dashboardRepo);
const dashboardController = new DashboardController(dashboardService);

router.get("/", Auth(UserRole.ADMIN), dashboardController.getDashboardInfo);

export const dashboardRoutes = router;
