import styles from './appHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <ul className={styles.menu}>
                        <li className={styles.item}>
                            <a href="/#" className={`${styles.link} text text_type_main-default`}>
                                <BurgerIcon type='primary' className={styles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Конструктор</span>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="/#" className={`${styles.link} text text_type_main-default`}>
                                <ListIcon type='secondary' className={styles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Лист заказов</span>
                            </a>
                        </li>
                    </ul>
                    <Logo />
                    <ul className={styles.menu}>
                        <li className={styles.profile}>
                            <a href="/#" className={`${styles.link} text text_type_main-default`}>
                                <ProfileIcon type='secondary' className={styles.icon} />
                                <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

export default AppHeader;