import React, { useState, useRef, useEffect } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";

import styles from './forms.module.css';
import { patchUser } from "../services/actions/user";

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { user, accessToken } = useSelector(store => store.user)

    const [formChanged, setFormChanged] = useState({
        changed: false,
        errors: false
    })
    const [inputState, setInputState] = useState({
        username: {
            value: '',
            disabled: true
        },
        email: {
            value: '',
            disabled: true
        },
        password: {
            disabled: true,
            value: ''
        }
    })

    useEffect(() => {
        setUserData()
    }, [user])

    useEffect(() => {
        let state = { ...formChanged }
        if (inputState.username.value !== user.username
            ||
            inputState.email.value !== user.email
            ||
            inputState.password.value !== ''
        ) {
            state = { ...state, changed: true }
        } else { state = { ...state, changed: false } }
        if (inputState.username.error
            ||
            inputState.email.error
            ||
            inputState.password.error
        ) {
            state = { ...state, errors: true }
        } else { state = { ...state, errors: false } }
        setFormChanged(state)
    }, [inputState])

    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const onIconClick = (inputName) => {
        (async function () {
            setInputState({ ...inputState, [inputName]: { ...inputState[inputName], disabled: false } })
        })()
            .then(() => {
                switch (inputName) {
                    case 'username':
                        usernameInput.current.focus()
                        break;
                    case 'email':
                        emailInput.current.focus()
                        break;
                    case 'password':
                        passwordInput.current.focus()
                        break;
                    default:
                        console.log('Wrong input')
                }
            })
    }

    const onBlur = () => {
        let state = { ...inputState }
        switch (true) {
            case inputState.username.error:
                state = { ...state, username: { ...state.username, value: user.username } }
                break;
            case inputState.email.error:
                state = { ...state, email: { ...state.email, value: user.email } }
                break;
            case inputState.password.error:
                state = { ...state, password: { ...state.password, value: '' } }
                break;
            default:
        }
        state = {
            username: {
                ...state.username,
                disabled: true,
                error: false
            },
            email: {
                ...state.email,
                disabled: true,
                error: false
            },
            password: {
                ...state.password,
                disabled: true,
                error: false
            }
        }
        setInputState(state)
    }

    const onChange = (e, inputName) => {
        let state = { ...inputState }
        state = {
            ...state,
            [inputName]: {
                ...state[inputName],
                value: e.target.value
            }
        };
        checkValidity(state);
    }

    const checkValidity = (propState) => {
        let state = propState
        if (state.username.value.length < 2) {
            state = { ...state, username: { ...state.username, error: true } }
        } else { state = { ...state, username: { ...state.username, error: false } } }
        if (state.email.value === "") {
            state = { ...state, email: { ...state.email, error: true } }
        } else { state = { ...state, email: { ...state.email, error: false } } }
        if (state.password.value.length < 6 && state.password.value !== "") {
            state = { ...state, password: { ...state.password, error: true } }
        } else { state = { ...state, password: { ...state.password, error: false } } }
        setInputState(state)
    }

    const setUserData = () => {
        setInputState({
            username: {
                ...inputState.username,
                value: user.username
            },
            email: {
                ...inputState.email,
                value: user.email
            },
            password: {
                ...inputState.password,
                value: '',
                error: false
            }
        })
    }

    const onCancelClick = e => {
        e.preventDefault();
        setUserData();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (!formChanged.errors) {
            const bodyInner = {
                email: inputState.email.value,
                name: inputState.username.value,
                password: inputState.password.value !== '' ? inputState.password.value : null
            }
            console.log(bodyInner)
            dispatch(patchUser(accessToken, bodyInner))
        }
    }

    return (
        <form onSubmit={onSubmit} className={styles.profileroot}>
            <fieldset className={styles.fieldset}>
                <Input
                    placeholder="Имя" type='text' name="username" value={inputState.username.value}
                    onIconClick={() => onIconClick('username')} onChange={(e) => onChange(e, 'username')} onBlur={onBlur}
                    disabled={inputState.username.disabled} error={inputState.username.error} errorText='Имя должно содержать на менее 2 символов'
                    icon="EditIcon" ref={usernameInput}
                />
                <Input
                    placeholder="Логин" type='email' name="email" value={inputState.email.value}
                    onIconClick={() => onIconClick('email')} onChange={(e) => onChange(e, 'email')} onBlur={onBlur}
                    disabled={inputState.email.disabled} error={inputState.email.error} errorText='Введите корректную почту'
                    icon="EditIcon" ref={emailInput}
                />
                <Input
                    placeholder="Пароль" type='password' name="password" value={inputState.password.value}
                    onIconClick={() => onIconClick('password')} onChange={(e) => onChange(e, 'password')} onBlur={onBlur}
                    disabled={inputState.password.disabled} error={inputState.password.error} errorText='Пароль должен быть не менее 6 символов'
                    icon="EditIcon" ref={passwordInput}
                />
            </fieldset>
            {formChanged.changed &&
                <div className={styles.button_container}>
                    <Button htmlType="submit" disabled={formChanged.errors}>Сохранить</Button>
                    <Button htmlType="button" onClick={onCancelClick}>Отмена</Button>
                </div>
            }
        </form>
    )
}

export default ProfileForm