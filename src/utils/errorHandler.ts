class ErrorHandler extends Error {
    statusCode: number; // Declare the property on the class

    constructor(message: string, statusCode: number) {
        super(message); // Call the parent class's constructor
        this.statusCode = statusCode; // Set the statusCode property

        // Capture the stack trace (excluding the constructor function from it)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler; // Use ES module export syntax
