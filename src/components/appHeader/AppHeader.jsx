import { Component } from "react";
import appHeaderStyles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default class AppHeader extends Component {
    render() {
        return (
            <header className={appHeaderStyles.header}>
                <nav className={appHeaderStyles.navigation}>
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.menuItem}>
                            <BurgerIcon type='primary' className={appHeaderStyles.icon} />
                            <span className={`text text_type_main-default text_color_inactive`}>Конструктор</span>
                        </li>
                        <li className={appHeaderStyles.menuItem}>
                            <ListIcon type='secondary' className={appHeaderStyles.icon} />
                            <span className={`text text_type_main-default text_color_inactive`}>Лист заказов</span>
                        </li>
                    </ul>
                    <Logo />
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.profile}>
                            <ProfileIcon type='secondary' className={appHeaderStyles.icon} />
                            <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}