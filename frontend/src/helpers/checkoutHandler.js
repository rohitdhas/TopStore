import { closeSpinner, startSpinner } from "./togglers";
const server_url = process.env.REACT_APP_SERVER_URL;

export default function checkout(e, address, mobile) {
    e.preventDefault();
    startSpinner();

    fetch(`${server_url}/place-order`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address.current.value,
            mobile: mobile.current.value
        }),
    });

    fetch(`${server_url}/create-checkout`, {
        credentials: "include",
    })
        .then((res) =>
            res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
        )
        .then(({ url }) => {
            window.location = url;
            closeSpinner();
        })
        .catch((err) => console.log(err));
}
