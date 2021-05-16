import { Router } from "express";
import rateLimit from "../middleware/rateLimit";
import speedLimit from "../middleware/slowDown";
import * as authController from "../controllers/authController";

export default (router: Router) => {
    
    router.route("/login").get(authController.authClient);

    router.route("/callback").get(authController.authCallBack);

    router.route("/refresh_token").get(authController.authRefresh);

    return router;
}