import React, { useEffect, useState } from 'react'
import styles from './Login.module.scss'
import triangle from '../assets/triangle.svg';
import Header from '../components/Header';



const Login = () => {

    const [authUri, setAuthUri] = useState();

    const fetchLoginURI = async () => {
        try {
            const data = await fetch('auth/login');
            const json = await data.json();
            setAuthUri(json);
            return json;
        } catch(err){
            return err;
        }
    }

    useEffect(()=> {
        fetchLoginURI();
        return () => {
            setAuthUri({}); 
        };
    },[])

    return (
        <React.Fragment>
            <Header/>
            <main className={styles.login__main}>
                <h1>ForYou</h1>
                <h3>Youtube Profile Made For You</h3>
                <a href={authUri}>
                    <img alt="signin" src={triangle}/>
                    <span>SIGN IN</span>
                </a>
            </main>
            
        </React.Fragment>
    )
}

export default Login
