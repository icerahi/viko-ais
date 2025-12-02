import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { UserAPISchema } from "../../infrastructure/apiValidations/user.validation";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const router = Router();

export const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const userAPISchema = new UserAPISchema();

router.post(
  "/create",
  Auth(UserRole.ADMIN),
  validateRequest(userAPISchema.userCreateAPISchema),
  userController.create
);

router.get("/", Auth(UserRole.ADMIN), userController.getAllUsers);
router.delete("/:id", Auth(UserRole.ADMIN), userController.delete);

export const userRoutes = router;
