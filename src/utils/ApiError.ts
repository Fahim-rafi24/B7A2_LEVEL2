class ApiError extends Error {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
    errors: any[];
    
    constructor(
        statusCode : number,
        message : string = "Something went worng",
        errors : any[] = [],
        stack : string = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.message = message
        this.data = null
        this.errors = errors

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
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
export { ApiError };