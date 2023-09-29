import React from 'react';
import styles from './appHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <a href="#" className={`${styles.menuLink} text text_type_main-default`}>
                            <BurgerIcon type="primary" />
                            <span className={`text text_type_main-default text_color_inactive`}>Конструктор</span>
                        </a>
                    </li>
                    <li className={styles.menuItem}>
                        <a href="#" className={`${styles.menuLink} text text_type_main-default`}>
                            <ListIcon type="secondary" />
                            <span className={`text text_type_main-default text_color_inactive`}>Лента заказов</span>
                        </a>
                    </li>
                    <Logo />
                    <ul className={styles.profile}>
                        <li className={styles.menuItem}>
                            <a href="#" className={`${styles.menuLink} text text_type_main-default`}>
                                <ProfileIcon type="secondary" />
                                <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;