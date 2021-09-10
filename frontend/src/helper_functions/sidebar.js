export default function toggleSidebar() {
    const overley = document.getElementById("sidebar_overlay");
    const sidebar = document.querySelector(".sidebar ul");

    overley.classList.toggle("active");
    sidebar.classList.toggle("active");
}