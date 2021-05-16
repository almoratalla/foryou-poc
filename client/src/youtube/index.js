import { getAccessParams } from "../utils"

const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds


const getTokenTimestamp = () => window.localStorage.getItem('youtube_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('youtube_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('youtube_refresh_token');

const setTokenTimestamp = () => window.localStorage.setItem('youtube_token_timestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('youtube_access_token', token)
}
const setLocalRefreshToken = token => window.localStorage.setItem('youtube_refresh_token', token)

const refreshAccessToken = async () => {
    try {
        const { data } = await fetch(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        console.log('Access token has been refreshed')
        window.location.reload();
        return;
    } catch (e) {
        console.error(e);
    }
};


export const getAccessToken = () => {
    const { error, access_token, refresh_token } = getAccessParams();
  
    if (error) {
        console.error(error);
        refreshAccessToken();
    }
  
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }
  
    const localAccessToken = getLocalAccessToken();
  
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
      setLocalAccessToken(access_token);
      setLocalRefreshToken(refresh_token);
      return access_token;
    }
  
    return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
    window.localStorage.removeItem('youtube_token_timestamp');
    window.localStorage.removeItem('youtube_access_token');
    window.localStorage.removeItem('youtube_refresh_token');
    window.location.reload();
};