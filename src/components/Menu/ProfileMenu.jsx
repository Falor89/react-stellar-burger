import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logout } from "../../services/actions/user";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './profileMenu.module.css';
import { routes } from "../../utils/path";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState({
        profile: true,
        orders: false
    })

    useEffect(() => {
        switch (location.pathname) {
            case routes.profile:
                setActiveTab({
                    profile: true,
                    orders: false
                })
                break;
            case routes.orders:
                setActiveTab({
                    profile: false,
                    orders: true,
                })
                break;
            default:
                setActiveTab({
                    profile: false,
                    orders: false,
                })
        }
    }, [location])


    const onClick = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.container}>
            <nav className={styles.container}>
                <Link className={`${styles.link} text text_type_main-medium ${activeTab.profile ? '' : styles.linkInactive}`} to={routes.profile}>Профиль</Link>
                <Link className={`${styles.link} text text_type_main-medium ${activeTab.orders ? '' : styles.linkInactive} `} to={routes.orderHistory}>История заказов</Link>
                <Button htmlType='button' onClick={onClick} className={`${styles.link} text text_type_main-medium ${styles.linkInactive}`}>Выход</Button>
            </nav>
            <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    )
}

export default ProfileMenu