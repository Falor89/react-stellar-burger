import { Component } from "react";
import appHeaderStyles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default class AppHeader extends Component {
    render() {
        return (
            <header className={appHeaderStyles.header}>
                <nav className={appHeaderStyles.nav}>
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.item}>
                            <a href="/#" className={`${appHeaderStyles.link} text text_type_main-default`}>
                                <BurgerIcon type='primary' className={appHeaderStyles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Конструктор</span>
                            </a>
                        </li>
                        <li className={appHeaderStyles.item}>
                            <a href="/#" className={`${appHeaderStyles.link} text text_type_main-default`}>
                                <ListIcon type='secondary' className={appHeaderStyles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Лист заказов</span>
                            </a>
                        </li>
                    </ul>
                    <Logo />
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.profile}>
                            <a href="/#" className={`${appHeaderStyles.link} text text_type_main-default`}>
                                <ProfileIcon type='secondary' className={appHeaderStyles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}