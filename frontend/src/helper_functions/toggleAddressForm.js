export default function toggleAddressForm(e) {
    e.preventDefault();

    const overlay = document.getElementById("address_form_overlay");
    const form = document.querySelector(".address_form form");

    overlay.classList.toggle("active");
    form.classList.toggle("active");
}
