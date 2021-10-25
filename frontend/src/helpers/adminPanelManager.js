import useNotifier from "../helpers/notificationHandler";
const server_url = process.env.REACT_APP_SERVER_URL;


export default function useAdminPanel() {
    const { notify } = useNotifier();

    function addProduct(e, refs) {
        e.preventDefault();
        const { nameRef, priceRef, urlRef, descriptionRef, categoryRef, tagsRef } = refs;
        // ________________________________________
        // Sending data to Server
        const productData = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            image: urlRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            tags: [...tagsRef.current.value.split(", ")],
        };

        fetch(`${server_url}/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then((res) => res.text())
            .then(({ msg }) => {
                // Emptying input values
                Object.keys(refs).forEach((ref) => {
                    refs[ref].current.value = "";
                });
                notify(msg)
            })
            .catch((err) => console.log(err));
    }

    return { addProduct }
}