import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../../forms/login";
import styles from './login.module.css';

import { routes } from "../../utils/path";

export const LoginPage = () => {
    const location = useLocation();
    const { passResetSuccess, authorization } = useSelector(store => store.user)

    if (authorization) {
        return (
            <Redirect to={location.state?.from || routes.main} />
        )
    }

    return (
        <>
            <p className={`text text_type_main-medium ${styles.reset_text}`}>{passResetSuccess ? 'Пароль был успешно изменен' : ''}</p>
            <LoginForm />
            <div className={styles.links}>
                <span className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <Link className={styles.link} to={routes.register}>
                        <span className="ml-2">Зарегистрироваться</span>
                    </Link>
                </span>
                <span className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link className={styles.link} to={routes.forgotPassword}>
                        <span className="ml-2">Восстановить пароль</span>
                    </Link>
                </span>
            </div>
        </>
    )
}