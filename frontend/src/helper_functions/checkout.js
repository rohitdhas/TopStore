import { startSpinner, closeSpinner } from "../Components/spinner";
export default function checkout(e, address, mobile) {
    e.preventDefault();
    startSpinner();

    fetch("/api/place-order", {
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

    fetch("/api/create-checkout", {
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
