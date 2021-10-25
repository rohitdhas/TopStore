import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { closeSpinner, startSpinner } from "./togglers";
import useNotifier from './notificationHandler'
import { updateUserData, resetUserData } from '../Redux/userData';

const server_url = process.env.REACT_APP_SERVER_URL;

export function useUserAuth() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { notify } = useNotifier();

    function checkIfAuthenticated() {
        startSpinner();
        fetch(`${server_url}/isAuthenticated`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((isAuthenticated) => {
                closeSpinner();
                if (isAuthenticated) {
                    notify('Already Logged In!');
                    history.push("/")
                };
            })
            .catch((err) => console.log(err));
    }

    function handleLogin(event, emailRef, passwordRef) {
        startSpinner();
        event.preventDefault();
        if (!emailRef.current || !passwordRef.current) return;

        fetch(`${server_url}/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: emailRef.current.value,
                password: passwordRef.current.value,
            }),
            credentials: "include",
        })
            .then((res) => res.json())
            .then(({ data, message }) => {
                closeSpinner();
                notify(message);
                if (data) {
                    history.push("/");
                }
            })
            .catch((err) => console.log(err));
    }

    function fireLogout() {
        startSpinner();
        fetch(`${server_url}/logout`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(({ message }) => {
                dispatch(resetUserData())
                history.push("/");
                closeSpinner();
                notify(message);
            });
    }

    function fetchUserData() {
        fetch(`${server_url}/data`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(({ data }) => {
                if (data) {
                    dispatch(updateUserData(data))
                }
            })
            .catch((err) => console.log(err));
    }

    function handleAccountCreation(e, refs) {
        e.preventDefault();

        startSpinner();
        const { fullNameRef, emailRef, passwordRef, password_againRef } = refs;

        if (passwordRef.current.value !== password_againRef.current.value) {
            closeSpinner();
            notify("Passwords don't Match!❌");
            return;
        }

        const userData = {
            full_name: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Making a POST request to the server with userData to create an account!
        fetch(`${server_url}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
        })
            .then((res) => res.json())
            .then(({ message, status }) => {
                closeSpinner();
                notify(message);
                if (status === "success") {
                    history.push("/login");
                }
            })
            .catch((err) => console.log(err));
    }


    return { checkIfAuthenticated, handleLogin, fireLogout, fetchUserData, handleAccountCreation }
}

export function useUserData() {
    const userData = useSelector(state => state.user)
    return userData
}