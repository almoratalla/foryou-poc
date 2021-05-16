import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    // windowMs: 15 * 60 * 1000, // 15 minutes
    windowMs: 30 * 1000, // 30 secs
    max:10 // limit each IP to 10 requests per windowMs
});

export default limiter;