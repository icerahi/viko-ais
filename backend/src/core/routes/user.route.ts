import { Router } from "express";
import { UserAPISchema } from "../../infrastructure/apiSchemas/user.validation";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const router = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const userAPISchema = new UserAPISchema();

router.post(
  "/create-student",
  validateRequest(userAPISchema.studentCreateAPISchema),
  userController.createStudent
);

export const userRoutes = router;
