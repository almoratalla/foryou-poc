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


const root = require('path').join('client', 'build')
export default async ({ app }: { app: express.Application }) => {

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(express.static(root));
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: false }));

    app.use(cors());
    app.use(cookieParser());
    if(process.env.NODE_ENV='production'){
        app.use(helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "default-src": ["self"],
                    "connect-src": ["https://www.googleapis.com"],
                    "child-src": ["self","https://www.googleapis.com"],
                    "script-src": ["self","https://www.googleapis.com"],
                    "style-src":["self"]
                }
            }
        }));
    }
    app.use(require('method-override')());
    app.use(corsMiddleware);

    // Load API routes
    await routes(app);
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
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



