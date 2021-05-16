import React, { useEffect, useState } from 'react';

import styles from "./SideNav.module.scss";

import triangle from "../assets/triangle.svg";
import subscriptions from "../assets/subscriptions.svg";
import { token } from '../youtube';

const SideNav = () => {

    const [navProfile, setNavProfile] = useState();

    const onLoadProfileNav = async () => {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?access_token=${token}&part=contentDetails%2CcontentOwnerDetails%2Csnippet&mine=true`,{ headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
        const json = await data.json();
        const snippetThumbnail = json.items[0].snippet.thumbnails.default.url
        setNavProfile(snippetThumbnail);
    }

    useEffect(() => {
        onLoadProfileNav();
    },[])

    return (
        <nav className={styles.foryou__sidenav}>
            <a href="/">
                    <img alt="signin" src={triangle}/>
            </a>
            <ul className={styles.sidenav__ul}>
                <li className={`${styles.active} ${styles.sidenav__li}`}>
                    <img src={navProfile} alt="prof-icon" />
                    <span>Your channel</span>
                </li>
                <li className={styles.sidenav__li}>
                    <img src={subscriptions} alt="sub-icon" />
                    <span>Subscriptions</span>
                </li>
            </ul>
        </nav>
    )
}

export default SideNav
