import { Router } from "express";
import rateLimit from "../middleware/rateLimit";
import speedLimit from "../middleware/slowDown";
import * as mainController from "../controllers/mainController";
import creds from '../../utils/secrets/client_secret_dev.json'
import { google } from "googleapis";

let title,desc, tags = []

const CLIENT_ID = creds.web.client_id;
const CLIENT_SECRET = creds.web.client_secret;
const REDIRECT_URI = creds.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
)

const authed = false;
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']

export default (router: Router) => {
    
    router.route("/").get((req, res, next)=> {
        if(!authed){
            const url = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES[0],
            })
            res.render('index.ejs', {url})
        }
        // res.render('index.ejs')
    });

    // password, email, name


    return router;
}