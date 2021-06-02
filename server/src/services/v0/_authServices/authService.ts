import * as DevOAuth2Data from "../../../utils/secrets/client_secret_dev.json"
import * as ProdOAuth2Data from "../../../utils/secrets/client_secret.json"
import { google } from "googleapis";
import { Credentials, OAuth2Client, GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";
declare const Buffer:any;
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']

let OAuth2Data;
if(process.env.NODE_ENV === 'production'){
    OAuth2Data = ProdOAuth2Data;
} else {
    OAuth2Data = DevOAuth2Data;
}

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
)



export class AuthService {
    constructor(){}

    public async generateAuthURL(state:string) {
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES[0],
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            state: state,
            prompt: 'consent'
        })
        return url;
    }

    public generateRandomString = (length:Number)  => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    public getNewToken(code:any, cb: any) {
        function tokenCb(err: any, token: any){
            if(err){
                return;
            }
            oAuth2Client.credentials = token;
            oAuth2Client.setCredentials(token);
            cb(token)
        }
        oAuth2Client.getToken(code, tokenCb)
        
        return new Promise((resolve, reject)=> {
            try {
                oAuth2Client.getToken(code, function(err: any, token: any){
                    if(err){
                        return;
                    }
                    oAuth2Client.credentials = token;
                    oAuth2Client.setCredentials(token);
                    resolve([oAuth2Client, token])
                });
            } catch(e){
                reject(e)
            }
            
        })
    }

    public async refreshToken(rtoken:string){
        oAuth2Client.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
              // store the refresh_token in my database!
              console.log(tokens.refresh_token);
            }
            console.log(tokens.access_token);
        });

        const bodyparams = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: rtoken,
            grant_type: 'refresh_token'
        }
        const targetbuffer:string = `${CLIENT_ID}:${CLIENT_SECRET}`
        const authbuffer = new Buffer.from(targetbuffer).toString('base64');

        const RefreshedAccessToken = await fetch('https://oauth2.googleapis.com/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${authbuffer}`
            },
            method: 'POST',
            body: JSON.stringify(bodyparams)
        })
        console.log('Refreshed access token:',RefreshedAccessToken);
        return RefreshedAccessToken;
    }
}

export default AuthService