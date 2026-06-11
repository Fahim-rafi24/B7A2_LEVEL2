import { Request, Response } from "express";
import { query } from "../config/db";
import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomRequest } from "../types/customRequest.type";

export const createIssue = AsyncHandler(async (req: CustomRequest, res: Response) => {
    const { title, description, type } = req.body;
    const reporter_id = req.user?.id;

    if (!title || !description || !type || !reporter_id) {
        throw new ApiError(400, "Title, description, type and auth are required");
    }

    if (description.length < 20) {
        throw new ApiError(400, "Description must be at least 20 characters");
    }

    if (!['bug', 'feature_request'].includes(type)) {
        throw new ApiError(400, "Invalid issue type");
    }

    const result = await query(
        "INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, type, reporter_id]
    );

    return res.status(201).json(new ApiResponse(201, result.rows[0], "Issue created successfully"));
});

export const getAllIssues = AsyncHandler(async (req: Request, res: Response) => {
    const { sort, type, status } = req.query;
    
    let sql = "SELECT i.*, u.id as u_id, u.name as u_name, u.role as u_role FROM issues i LEFT JOIN users u ON i.reporter_id = u.id WHERE 1=1";
    const values: any[] = [];
    
    if (type) { sql += ` AND i.type = $${values.length + 1}`; values.push(type); }
    if (status) { sql += ` AND i.status = $${values.length + 1}`; values.push(status); }
    
    sql += ` ORDER BY i.created_at ${sort === 'oldest' ? 'ASC' : 'DESC'}`;

    const result = await query(sql, values);
    
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

    return res.status(200).json(new ApiResponse(200, issues, "Issues retrieved successfully"));
});

export const getIssueById = AsyncHandler(async (req: Request, res: Response) => {
    const result = await query(
        "SELECT i.*, u.id as u_id, u.name as u_name, u.role as u_role FROM issues i LEFT JOIN users u ON i.reporter_id = u.id WHERE i.id = $1", 
        [req.params.id]
    );

    if (result.rows.length === 0) throw new ApiError(404, "Issue not found");

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

    return res.status(200).json(new ApiResponse(200, issue, "Issue retrieved successfully"));
});

export const updateIssue = AsyncHandler(async (req: CustomRequest, res: Response) => {
    const { title, description, type, status } = req.body;
    const { id } = req.params;
    const user = req.user;

    const currentResult = await query("SELECT * FROM issues WHERE id = $1", [id]);
    if (currentResult.rows.length === 0) throw new ApiError(404, "Issue not found");
    const issue = currentResult.rows[0];

    if (user?.role !== 'maintainer' && (issue.reporter_id !== user?.id || issue.status !== 'open')) {
        throw new ApiError(403, "Forbidden: Cannot update this issue");
    }

    const result = await query(
        "UPDATE issues SET title = COALESCE($1, title), description = COALESCE($2, description), type = COALESCE($3, type), status = COALESCE($4, status) WHERE id = $5 RETURNING *",
        [title, description, type, status, id]
    );

    return res.status(200).json(new ApiResponse(200, result.rows[0], "Issue updated successfully"));
});

export const deleteIssue = AsyncHandler(async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    
    const result = await query("DELETE FROM issues WHERE id = $1", [id]);
    if (result.rowCount === 0) throw new ApiError(404, "Issue not found");

    return res.status(200).json(new ApiResponse(200, {}, "Issue deleted successfully"));
});