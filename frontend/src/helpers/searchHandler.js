import { useState, useEffect } from "react";
import { filterTags } from "./utilityFuncs";
import { openAutocompleteBar, closeAutocompleteBar } from "./togglers";

const server_url = process.env.REACT_APP_SERVER_URL;

export function searchProducts(e, userInput, history) {
    e.preventDefault();

    if (!userInput) return;
    history.replace("/");
    history.push(`search/${userInput}`);
    closeAutocompleteBar();
}


export function useAutocomplete(userInput) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!userInput) return;

        fetch(`${server_url}/search?term=${userInput}`)
            .then((res) => res.json())
            .then(({ data }) => {
                if (data) {
                    setTags(filterTags(data));
                    openAutocompleteBar();
                }
            })
            .catch((err) => console.log(err));
    }, [userInput])

    return { tags }
}