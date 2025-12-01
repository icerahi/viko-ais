import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { SubjectGroupRepository } from "../../infrastructure/repositories/subjectGroup.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { SubjectGroupController } from "../controllers/subjectGroup.controller";
import { SubjectGroupService } from "../services/subjectGroup.service";

const router = Router();

const subjectGroupRepo = new SubjectGroupRepository();
const subjectGroupService = new SubjectGroupService(subjectGroupRepo);
const subjectGroupController = new SubjectGroupController(subjectGroupService);

router.get(
  "/",
  Auth(UserRole.ADMIN),
  subjectGroupController.getAllSubjectGroup
);

export const subjectGroupRoutes = router;
