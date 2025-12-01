import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { createGroupAPISchema } from "../../infrastructure/apiSchemas/group.validation";
import { assignGroupAPISchema } from "../../infrastructure/apiSchemas/student.validation";
import { GroupRepository } from "../../infrastructure/repositories/group.repository";
import { Auth } from "../../middlewares/AuthMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { GroupController } from "../controllers/group.controller";
import { GroupService } from "../services/group.service";

const router = Router();

const groupRepo = new GroupRepository();
const groupService = new GroupService(groupRepo);
const groupController = new GroupController(groupService);

router.post(
  "/",
  Auth(UserRole.ADMIN),
  validateRequest(createGroupAPISchema),
  groupController.create
);
router.get("/", Auth(UserRole.ADMIN), groupController.getAllGroups);
router.delete("/:id", Auth(UserRole.ADMIN), groupController.delete);
router.post(
  "/assign-subject",
  Auth(UserRole.ADMIN),
  validateRequest(assignGroupAPISchema),
  groupController.assignSubject
);

export const groupRoutes = router;
