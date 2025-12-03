import { Router } from "express";
import { authAPISchema } from "../../infrastructure/apiValidations/auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { userRepo } from "./user.route";

const router = Router();

const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post("/login", validateRequest(authAPISchema), authController.login);
router.post("/logout", authController.logout);

export const authRoutes = router;
