import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import ForgotPasswordForm from "../../forms/forgot-password";
import styles from './forgot-password.module.css'

import { routes } from "../../utils/path";

export const ForgotPasswordPage = () => {
    const { authorization } = useSelector(store => store.user);

    if (authorization) {
        return (
            <Redirect to={routes.main} />
        )
    }

    return (
        <>
            <ForgotPasswordForm />
            <div className={styles.links}>
                <span className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    <Link className={styles.link} to={routes.login}>
                        <span className="ml-2">Войти</span>
                    </Link>
                </span>
            </div>
        </>
    )
}