declare class ApiError extends Error {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
    errors: any[];
    constructor(statusCode: number, message?: string, errors?: any[], stack?: string);
    toJSON(): {
        statusCode: number;
        success: boolean;
        message: string;
        data: any;
        errors: any[];
    };
}
export { ApiError };
//# sourceMappingURL=ApiError.d.ts.map