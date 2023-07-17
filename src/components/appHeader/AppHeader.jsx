import './AppHeader.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
        return (
            <header className='App-header'>
                <nav className='App-nav'>
                    <ul className='App-menu'>
                        <li className='App-item'>
                            <a href="/#" className={`App-link text text_type_main-default`}>
                                <BurgerIcon type='primary' className='App-icon' />
                                <span className={`text text_type_main-default text_color_inactive`}>Конструктор</span>
                            </a>
                        </li>
                        <li className='App-item'>
                            <a href="/#" className={`App-link text text_type_main-default`}>
                                <ListIcon type='secondary' className='App-icon' />
                                <span className={`text text_type_main-default text_color_inactive`}>Лист заказов</span>
                            </a>
                        </li>
                    </ul>
                    <Logo />
                    <ul className='App-menu'>
                        <li className='App-profile'>
                            <a href="/#" className={`App-link text text_type_main-default`}>
                                <ProfileIcon type='secondary' className='App-icon' />
                                <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

export default AppHeader;