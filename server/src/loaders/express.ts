import path from 'path';
import * as express from "express"
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// import config from "../config";
import routes from "../api/index";
import corsMiddleware from '../api/middleware/cors';
import errorMiddleware from '../api/middleware/error';
import { get404, errorHandler } from '../api/controllers/errorController';
import { NotFoundError } from '../utils/handlers/error';

export default async ({ app }: { app: express.Application }) => {

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: false }));
    // store.sync()

    app.use(cors());
    app.use(cookieParser());
    // app.use(helmet());
    app.use(require('method-override')());
    app.use(corsMiddleware);

    // app.use(csrfProtection);
    // app.use(flash());app.use((req, res, next) => {
        // res.locals.isAuthenticated = req.session.isLoggedIn;

        // CSRF Feature //
        // res.locals.csrfToken = req.csrfToken();
        // if (err.code === 'EBADCSRFTOKEN') { 
        //   console.log(err.code)
        //   return res.redirect('/asportal/login')
        // };
    //     next();
    // })

    // Load API routes
    await routes(app);
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
    });

    /// Error handling middlewares
    app.use(errorMiddleware) // catches unhandled errors
    // catch 404 and forward to error handler enable for apis
    app.use(get404) // server-side rendering handler
    app.use((req, res, next) => next(new NotFoundError())); // client-side api response middleware

    // Error controller
    app.use(errorHandler);
};

//
/* @ Notes
  import { fileURLToPath } from 'url';
  Use these constants if package.json is set into type module: 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
*/
//



