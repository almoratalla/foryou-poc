import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import SideNav from '../components/SideNav'

import YourChannel from '../components/YourChannel';
import YourSubscriptions from '../components/YourSubscriptions';

import styles from "./Profile.module.scss";

const Profile = () => {
    
    return (
        <div className={styles.container__profile}>
            <SideNav/>
            <div className={styles.container__profilecontext}> 
                <Header/>
                <main>
                    <Switch>
                        <Route path="/subscriptions" component={YourSubscriptions} exact/>
                        <Route path="/" component={YourChannel}/>
                    </Switch>
                </main>
            </div>
        </div>
    )
}

export default Profile
