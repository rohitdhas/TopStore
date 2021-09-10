import { closeSpinner, startSpinner } from "../Components/spinner";

export function addToCart(productData, notify) {
    startSpinner()
    fetch("http://localhost:8080/cart/modify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ type: "ADD", data: productData }),
    })
        .then((res) => res.json())
        .then(({ message }) => {
            notify(message);
            closeSpinner();
        })
        .catch((err) => console.log(err));
}

export async function getCartData() {
    let res = await fetch("http://localhost:8080/cart-items", {
        credentials: "include",
    });
    let data = await res.json();
    return data;
}
