"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message = "Something went worng", errors = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.data = null;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    // Custom toJSON method to include all properties
    toJSON() {
        return {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            data: this.data,
            errors: this.errors,
            // stack: this.stack, // Include stack trace
        };
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map