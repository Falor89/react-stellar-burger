import React, { FC } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from '../../utils/hooks';

import ForgotPasswordForm from "../../forms/forgot-password";
import styles from './forgot-password.module.css'

export const ForgotPasswordPage: FC = () => {
    const { authorization } = useSelector(store => store.user);

    if (authorization) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <>
            <ForgotPasswordForm />
            <div className={styles.links}>
                <span className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    <Link className={styles.link} to="/login">
                        <span className="ml-2">Войти</span>
                    </Link>
                </span>
            </div>
        </>
    )
}