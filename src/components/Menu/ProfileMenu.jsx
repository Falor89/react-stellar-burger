import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../../services/actions/user";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './profileMenu.module.css';

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.container}>
            <nav className={styles.container}>
                <NavLink activeClassName={styles.link_active} className={`${styles.link} text text_type_main-medium text_color_inactive`} to="/profile">Профиль</NavLink>
                <NavLink activeClassName={styles.link_active} className={`${styles.link} text text_type_main-medium text_color_inactive`} to="/profile/orders">История заказов</NavLink>
                <Button htmlType="button" onClick={onClick} className={`${styles.link} text text_type_main-medium text_color_inactive`}>Выход</Button>
            </nav>
            <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    )
}

export default ProfileMenu