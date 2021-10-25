import { closeSpinner, startSpinner } from "./togglers";
import { useSelector, useDispatch } from 'react-redux';
import { upadateCartData } from "../Redux/userData";
import useNotifier from './notificationHandler';
const server_url = process.env.REACT_APP_SERVER_URL;

export function useCart() {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.user)
    const { notify } = useNotifier();

    function removeFromCart(productID) {
        startSpinner();
        fetch(`${server_url}/cart/modify`, {
            credentials: "include",
            body: JSON.stringify({ type: "REMOVE", data: { _id: productID } }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(({ message }) => {
                notify(message);
                closeSpinner()
                updateCart()
            });
    }

    function modifyQuantity(data) {
        startSpinner();
        fetch(`${server_url}/cart/item/modify`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(() => {
                closeSpinner()
                updateCart()
            })
            .catch((err) => console.log(err));
    }


    function addToCart(productData) {
        startSpinner()
        fetch(`${server_url}/cart/modify`, {
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
                updateCart()
                closeSpinner();
            })
            .catch((err) => console.log(err));
    }

    function updateCart() {
        startSpinner();
        fetch(`${server_url}/cart-items`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                closeSpinner();
                if (data.message || !data) return;
                else dispatch(upadateCartData(data));
            })
            .catch((err) => console.log(err));
    }

    return { cart, updateCart, modifyQuantity, removeFromCart, addToCart }
}