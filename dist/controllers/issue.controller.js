"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.updateIssue = exports.getIssueById = exports.getAllIssues = exports.createIssue = void 0;
const db_1 = require("../config/db");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const status_1 = require("../config/status");
exports.createIssue = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { title, description, type } = req.body;
    const reporter_id = req.user?.id;
    if (!title || !description || !type || !reporter_id) {
        throw new ApiError_1.ApiError(status_1.statusCode.BAD_REQUEST, "Title, description, type and auth are required");
    }
    if (description.length < 20) {
        throw new ApiError_1.ApiError(status_1.statusCode.BAD_REQUEST, "Description must be at least 20 characters");
    }
    if (!['bug', 'feature_request'].includes(type)) {
        throw new ApiError_1.ApiError(status_1.statusCode.BAD_REQUEST, "Invalid issue type");
    }
    const result = await (0, db_1.query)("INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, type, reporter_id]);
    return res.status(status_1.statusCode.CREATE).json(new ApiResponse_1.ApiResponse(status_1.statusCode.CREATE, result.rows[0], "Issue created successfully"));
});
exports.getAllIssues = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { sort, type, status } = req.query;
    let sql = "SELECT i.*, u.id as u_id, u.name as u_name, u.role as u_role FROM issues i LEFT JOIN users u ON i.reporter_id = u.id WHERE 1=1";
    const values = [];
    if (type) {
        sql += ` AND i.type = $${values.length + 1}`;
        values.push(type);
    }
    if (status) {
        sql += ` AND i.status = $${values.length + 1}`;
        values.push(status);
    }
    sql += ` ORDER BY i.created_at ${sort === 'oldest' ? 'ASC' : 'DESC'}`;
    const result = await (0, db_1.query)(sql, values);
    const issues = result.rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        type: row.type,
        status: row.status,
        reporter: { id: row.u_id, name: row.u_name, role: row.u_role },
        created_at: row.created_at,
        updated_at: row.updated_at
    }));
    return res.status(status_1.statusCode.READ).json(new ApiResponse_1.ApiResponse(status_1.statusCode.READ, issues, "Issues retrieved successfully"));
});
exports.getIssueById = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const result = await (0, db_1.query)("SELECT i.*, u.id as u_id, u.name as u_name, u.role as u_role FROM issues i LEFT JOIN users u ON i.reporter_id = u.id WHERE i.id = $1", [req.params.id]);
    if (result.rows.length === 0)
        throw new ApiError_1.ApiError(status_1.statusCode.NOT_FOUND, "Issue not found");
    const row = result.rows[0];
    const issue = {
        id: row.id,
        title: row.title,
        description: row.description,
        type: row.type,
        status: row.status,
        reporter: { id: row.u_id, name: row.u_name, role: row.u_role },
        created_at: row.created_at,
        updated_at: row.updated_at
    };
    return res.status(status_1.statusCode.READ).json(new ApiResponse_1.ApiResponse(status_1.statusCode.READ, issue, "Issue retrieved successfully"));
});
exports.updateIssue = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { title, description, type, status } = req.body;
    const { id } = req.params;
    const user = req.user;
    const currentResult = await (0, db_1.query)("SELECT * FROM issues WHERE id = $1", [id]);
    if (currentResult.rows.length === 0)
        throw new ApiError_1.ApiError(status_1.statusCode.NOT_FOUND, "Issue not found");
    const issue = currentResult.rows[0];
    if (user?.role !== 'maintainer' && (issue.reporter_id !== user?.id || issue.status !== 'open')) {
        throw new ApiError_1.ApiError(status_1.statusCode.FORBIDDEN, "Forbidden: Cannot update this issue");
    }
    const result = await (0, db_1.query)("UPDATE issues SET title = COALESCE($1, title), description = COALESCE($2, description), type = COALESCE($3, type), status = COALESCE($4, status) WHERE id = $5 RETURNING *", [title, description, type, status, id]);
    return res.status(status_1.statusCode.UPDATE).json(new ApiResponse_1.ApiResponse(status_1.statusCode.UPDATE, result.rows[0], "Issue updated successfully"));
});
exports.deleteIssue = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, db_1.query)("DELETE FROM issues WHERE id = $1", [id]);
    if (result.rowCount === 0)
        throw new ApiError_1.ApiError(status_1.statusCode.NOT_FOUND, "Issue not found");
    return res.status(status_1.statusCode.DELETE).json(new ApiResponse_1.ApiResponse(status_1.statusCode.DELETE, {}, "Issue deleted successfully"));
});
//# sourceMappingURL=issue.controller.js.map