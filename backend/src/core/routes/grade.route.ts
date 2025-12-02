import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import {
  gradeCreateAPISchema,
  gradeUpdateAPISchema,
} from "../../infrastructure/apiValidations/grade.validation";
import { GradeRepository } from "../../infrastructure/repositories/grade.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { GradeController } from "../controllers/grade.controller";
import { GradeService } from "../services/grade.service";

const router = Router();

const gradeRepo = new GradeRepository();
const gradeService = new GradeService(gradeRepo);
const gradeController = new GradeController(gradeService);

router.post(
  "/create",
  Auth(UserRole.TEACHER),
  validateRequest(gradeCreateAPISchema),
  gradeController.create
);
router.patch(
  "/:id",
  Auth(UserRole.TEACHER),
  validateRequest(gradeUpdateAPISchema),
  gradeController.update
);
router.get("/my-grades", Auth(UserRole.STUDENT), gradeController.myGrade);
router.get("/:subjectId", Auth(UserRole.TEACHER), gradeController.getAllGrades);

export const gradeRoutes = router;
