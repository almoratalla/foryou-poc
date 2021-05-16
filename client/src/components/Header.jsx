import React from 'react'

import { trans } from "../utils"

import styles from "./Header.module.scss"

const Header = () => {
    const themeSwitchHandler = (e) => {
        let themeSwitch;
        if(e.target.checked === true){
            trans();
            themeSwitch = ['data-theme', 'dark']
        } else {
            trans();
            themeSwitch = ['data-theme', 'light'];
        }
        document.documentElement.setAttribute(...themeSwitch)
    }

    return (
        <header className={styles.foryou__header}>
            <div className={styles.header__theme}>
                <span>Dark Mode</span>
                <input type="checkbox" id="theme" name="theme" onChange={themeSwitchHandler}/>
                <label className={styles.toggle__label} htmlFor="theme">Toggle</label>
            </div>
        </header>
    )
}

export default Header
