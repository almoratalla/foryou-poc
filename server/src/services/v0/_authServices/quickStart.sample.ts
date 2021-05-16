import * as OAuth2Data from "../../../utils/secrets/client_secret_dev.json"
import fs from "fs";
import readline from "readline";
import path from "path"
import { Auth, google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
const TOKEN_DIR = path.join(__dirname, '../../../utils/secrets/.credentials/');
const TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-token.json';
const SECRET_PATH = path.join(__dirname, '../../../utils/secrets/client_secret.json')



export class AuthService {
    constructor(){}

    public async LoadClientSecret(){
        fs.readFile(SECRET_PATH, (err, content) => {
            if(err){
                console.log('Error loading client secret file: ' + err);
                return;
            }
            this.authorizeClient(JSON.parse(content.toString()), this.getChannel);
        })
    }

    public async storeToken(token:any){
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('Token stored to ' + TOKEN_PATH);
        });
    }


    private async getNewToken(oauth2Client: any, callback:any){
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oauth2Client.getToken(code,(err:any, token:any) => {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                this.storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    public async authorizeClient(credentials: { web: { client_secret: string, client_id: string, redirect_uris: Array<string>}}, callback: any){
        const clientSecret = credentials.web.client_secret;
        const clientId = credentials.web.client_id;
        const redirectUrl = credentials.web.redirect_uris[0];
        const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                this.getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token.toString());
                callback(oauth2Client);
            }
        })
    }

    
    private async getChannel(auth:any){
        const service = google.youtube('v3');
        service.channels.list({
            auth: auth,
            part: ['snippet,contentDetails,statistics'],
            forUsername: 'GoogleDevelopers'
        }, function(err:any, response:any) {
            if (err) {
            console.log('The API returned an error: ' + err);
            return;
            }
            var channels = response.data.items;
            if (channels.length == 0) {
            console.log('No channel found.');
            } else {
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                        'it has %s views.',
                        channels[0].id,
                        channels[0].snippet.title,
                        channels[0].statistics.viewCount);
            }
        });
    }

}

export default AuthService