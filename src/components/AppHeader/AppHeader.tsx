import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import AppHeaderLink from '../AppHeaderLink/AppHeaderLink';

const AppHeader: FC = () => {
    const location = useLocation().pathname;
    const [activeTab, setActiveTab] = useState({
        constructor: true,
        feed: false,
        profile: false
    })

    useEffect(() => {
        switch (location) {
            case '/':
                setActiveTab({
                    constructor: true,
                    feed: false,
                    profile: false
                })
                break;
            case '/profile':
                setActiveTab({
                    constructor: false,
                    feed: false,
                    profile: true
                })
                break;
            default:
                setActiveTab({
                    constructor: false,
                    feed: false,
                    profile: false
                })
        }
    }, [location])

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.navigation}>
                <ul className={styles.menu}>
                    <li className={`${styles.menuItem} pt-4 pb-4 pr-5 pl-5`}>
                        <AppHeaderLink text='Конструктор' active={activeTab.constructor} to='/'>
                            <BurgerIcon type={activeTab.constructor ? 'primary' : 'secondary'} />
                        </AppHeaderLink>
                    </li>
                    <li className={`${styles.menuItem} pt-4 pb-4 pr-5 pl-5`}>
                        <AppHeaderLink text='Лента заказов' to='/feed' active={activeTab.feed}>
                            <ListIcon type={activeTab.feed ? 'primary' : 'secondary'} />
                        </AppHeaderLink>
                    </li>
                </ul>
                <Link to='/' className={styles.logoLink}>
                    <Logo />
                </Link>
                <ul className={styles.menu}>
                    <li className={`pt-4 pb-4 pr-5 pl-5 ${styles.profile}`}>
                        <AppHeaderLink text='Личный кабинет' to='/profile' active={activeTab.profile}>
                            <ProfileIcon type={activeTab.profile ? 'primary' : 'secondary'} />
                        </AppHeaderLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;