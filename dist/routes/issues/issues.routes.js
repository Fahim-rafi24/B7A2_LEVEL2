"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const issue_controller_1 = require("../../controllers/issue.controller");
const router = (0, express_1.Router)();
router.route("/").post(auth_middleware_1.verifyJWT, issue_controller_1.createIssue).get(issue_controller_1.getAllIssues);
router.route("/:id").get(issue_controller_1.getIssueById).patch(auth_middleware_1.verifyJWT, issue_controller_1.updateIssue).delete(auth_middleware_1.verifyJWT, (0, auth_middleware_1.authorizeRole)(["maintainer"]), issue_controller_1.deleteIssue);
exports.default = router;
//# sourceMappingURL=issues.routes.js.map