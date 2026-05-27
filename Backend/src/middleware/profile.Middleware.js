// middleware/profileMiddleware.js
import { ApiError } from "../utils/Api_Error.js";

export const studentOnly = (req, res, next) => {
    if (req.user.role !== 'Student') {
        return next(new ApiError("Access denied. Only students can access this resource.", 403));
    }
    next();
};