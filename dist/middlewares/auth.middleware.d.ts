import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest.type";
export declare const verifyJWT: (req: any, res: any, next: any) => void;
export declare const authorizeRole: (roles: string[]) => (req: CustomRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map