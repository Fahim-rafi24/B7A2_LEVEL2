import { Router } from "express";
import { verifyJWT, authorizeRole } from "../../middlewares/auth.middleware";
import {
    createIssue,
    deleteIssue,
    getAllIssues,
    getIssueById,
    updateIssue
} from "../../controllers/issue.controller";

const router = Router();

router.route("/").post(verifyJWT, createIssue).get(getAllIssues);
router.route("/:id").get(getIssueById).patch(verifyJWT, updateIssue).delete(verifyJWT, authorizeRole(["maintainer"]), deleteIssue);

export default router;