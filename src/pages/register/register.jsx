import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import RegisterForm from "../../forms/regisration";
import styles from './register.module.css';
import { routes } from "../../utils/path";

export const RegisterPage = () => {
    const { authorization } = useSelector(store => store.user);

    if (authorization) {
        return (
            <Redirect to={routes.main} />
        )
    }

    return (
        <>
            <RegisterForm />
            <div className={styles.links}>
                <span className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                    <Link className={styles.link} to={routes.login}>
                        <span className="ml-2">Войти</span>
                    </Link>
                </span>
            </div>
        </>
    )
}