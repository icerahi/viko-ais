import { Router } from "express";
import { UserRole } from "../../generated/prisma/enums";
import {
  assignSubjectAPISchema,
  createGroupAPISchema,
} from "../../infrastructure/apiValidations/group.validation";
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
  "/create",
  Auth(UserRole.ADMIN),
  validateRequest(createGroupAPISchema),
  groupController.create
);
router.get("/", Auth(UserRole.ADMIN), groupController.getAllGroups);
router.delete("/:id", Auth(UserRole.ADMIN), groupController.delete);
router.post(
  "/:groupId/assign-subject",
  Auth(UserRole.ADMIN),
  validateRequest(assignSubjectAPISchema),
  groupController.assignSubject
);

router.delete(
  "/:groupId/remove-subject",
  Auth(UserRole.ADMIN),
  groupController.removeSubject
);

export const groupRoutes = router;
