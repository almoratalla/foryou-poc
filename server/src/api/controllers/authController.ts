import { Request, Response, NextFunction } from "express";
import authService  from "../../services/v0/_authServices";
import _response from "../../services/v0/_utils";
import querystring from "querystring";

const { AuthService } = authService;
const stateKey = 'youtube_auth_state';

let host = `http://localhost:3000`
if(process.env.NODE_ENV === 'production'){
    host = `https://foryoutube.herokuapp.com`
}


export const authClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const AuthClient = new AuthService;        
        const state = AuthClient.generateRandomString(16);
        res.cookie(stateKey, state);
        let url = await AuthClient.generateAuthURL(state);
        return res.status(200).json(url);
    } catch (err){
        next(err)
    }
}

export const authCallBack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;

        const AuthClient = new AuthService;   
        const [oAuth2, token]:any = await AuthClient.getNewToken(code,()=>{});
        const {access_token, refresh_token} = token;
        
        if (state === null || state !== storedState) {
            res.redirect(`/#${new URLSearchParams({error: 'state_mismatch'})}`);
        } else {
            res.clearCookie(stateKey);
            res.redirect(`${host}/foryou?${querystring.stringify({
                access_token,
                refresh_token,
            })}`)
        }

    } catch (err){
        console.error(err);
        next(err);
    }
}

export const authRefresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token:any = req.query?.refresh_token;

        const AuthClient = new AuthService;
        const access_token = await AuthClient.refreshToken(refresh_token);
        res.json({access_token})
    } catch (err){
        console.error(err);
        next(err);
    }
}