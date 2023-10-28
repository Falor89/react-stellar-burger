import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "../../forms/profile";
import ProfileMenu from "../../components/Menu/ProfileMenu";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";

import styles from "./profile.module.css";
import { getUserInfo } from "../../services/actions/user";
import { Route, useLocation, Switch } from "react-router-dom";

export const ProfilePage = () => {
    const location = useLocation().pathname
    const dispatch = useDispatch();
    const { accessToken } = useSelector(store => store.user)

    useEffect(() => {
        dispatch(getUserInfo(accessToken))
    }, [location])

    return (
        <div className={styles.root}>
            <ProfileMenu />
            <Switch>
                <Route exact={true} path="/profile">
                    <ProfileForm />
                </Route>
                <Route exact={true} path="/profile/orders">
                    <ProfileFeed />
                </Route>
                <Route>
                    <h2>Такого маршрута не существует</h2>
                </Route>
            </Switch>
        </div>
    )
}