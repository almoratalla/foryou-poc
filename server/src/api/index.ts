import { Router, Application } from 'express';
import route_main from './routes/mainRoutes';
import route_auth from './routes/authRoutes';

// Improve code here
export default (app: Application) => {

    const main_router = Router();
    route_main(main_router);
    app.use("/", main_router)

    const auth_router = Router();
    route_auth(auth_router);
    app.use("/auth", auth_router)
}