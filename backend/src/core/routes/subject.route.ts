import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { SubjectRepository } from "../../infrastructure/repositories/subject.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { SubjectController } from "../controllers/subject.controller";
import { SubjectService } from "../services/subject.service";

const router = Router();

const subjectRepo = new SubjectRepository();
const subjectService = new SubjectService(subjectRepo);
const subjectController = new SubjectController(subjectService);

router.post("/create", Auth(UserRole.ADMIN), subjectController.create);
router.get("/", Auth(UserRole.ADMIN), subjectController.getAllSubjects);
router.delete("/:id", Auth(UserRole.ADMIN), subjectController.delete);
router.patch("/:id", Auth(UserRole.ADMIN), subjectController.update);
router.get(
  "/teacher-subjects",
  Auth(UserRole.TEACHER, UserRole.ADMIN),
  subjectController.getTeacherSubjects
);

router.get(
  "/my-subjects",
  Auth(UserRole.STUDENT),
  subjectController.mySubjects
);
export const subjectRoutes = router;
