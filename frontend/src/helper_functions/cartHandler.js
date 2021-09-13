import { closeSpinner, startSpinner } from "../Components/spinner";

export function addToCart(productData, notify) {
    startSpinner()
    fetch("/api/cart/modify", {
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
            updateCartCount();
            closeSpinner();
        })
        .catch((err) => console.log(err));
}

export function updateCartCount() {
    fetch("/api/cart-items", {
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            const icon = document.querySelector('[data-count]');
            if (data.message) return;
            else icon.dataset.count = data.length;
        })
        .catch((err) => console.log(err));
}