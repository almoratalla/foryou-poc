import { useEffect, useState } from 'react';
import Login from './screens/Login';
import styles from './App.module.scss';

import { token } from "./youtube";
import Profile from './screens/Profile';

const App = (props) => {

    const [accessToken, setAccessToken] = useState('');

    useEffect(()=> {
        setAccessToken(token);
    },[setAccessToken])

    return (
        <div className={styles.App}>
            { accessToken? <Profile/>: <Login/> }
        </div>
    );
}

export default App;
