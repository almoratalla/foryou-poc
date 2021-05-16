import slowDown from "express-slow-down";

const speedLimiter = slowDown({
    windowMs: 30 * 1000, // 30 secs
    delayAfter: 4, // allow 100 requests per 30 secs, then...
    delayMs: 100 // begin adding 100ms of delay per request above 100:
});

export default speedLimiter;