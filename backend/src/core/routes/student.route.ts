import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { assignGroupAPISchema } from "../../infrastructure/apiSchemas/student.validation";
import { StudentRepository } from "../../infrastructure/repositories/student.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentController } from "../controllers/student.controller";
import { StudentService } from "../services/student.service";

const router = Router();

const studentRepo = new StudentRepository();
const studentService = new StudentService(studentRepo);
const studentController = new StudentController(studentService);

router.patch(
  "/:userId/assignGroup",
  Auth(UserRole.ADMIN),
  validateRequest(assignGroupAPISchema),
  studentController.assignGroup
);
router.get("/", Auth(UserRole.ADMIN), studentController.allStudents);

export const studentRoutes = router;
