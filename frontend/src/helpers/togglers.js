export function displayProfileOptions() {
    const dropdown = document.querySelector("#profile_dropdown ul");
    const overlay = document.querySelector("#profile_dropdown .overlay");
    dropdown.classList.toggle("active");
    overlay.classList.toggle("active");
}

export function openAutocompleteBar() {
    const bar = document.querySelector(".autocomplete_bar");
    const overlay = document.querySelector(".autocomplete_bar_overlay");
    bar.classList.add("active");
    overlay.classList.add("active");
}

export function closeAutocompleteBar() {
    const bar = document.querySelector(".autocomplete_bar");
    const overlay = document.querySelector(".autocomplete_bar_overlay");
    bar.classList.remove("active");
    overlay.classList.remove("active");
}

export function toggleSidebar() {
    const overley = document.getElementById("sidebar_overlay");
    const sidebar = document.querySelector(".sidebar ul");

    overley.classList.toggle("active");
    sidebar.classList.toggle("active");
}

export function toggleAddressForm() {
    const overlay = document.getElementById("address_form_overlay");
    const form = document.querySelector(".address_form form");

    overlay.classList.toggle("active");
    form.classList.toggle("active");
}

export const startSpinner = () => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");
};

export const closeSpinner = () => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.remove("active");
};

