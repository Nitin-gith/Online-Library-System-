import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Admfooter from "./Admfooter";
import Admheader from "./Admheader";
import AdmSidebar from "./AdmSidebar";


export default function Admlayout() {

    // Closes the mobile sidebar drawer when clicking anywhere outside it.
    // Only acts when sidebar-open is set on <body> (mobile drawer mode) -
    // desktop's sidebar-mini collapse state is a pinned layout, not an
    // overlay, so outside clicks shouldn't affect it.
    useEffect(() => {
        function handleClickOutside(e) {
            const isSidebarOpen = document.body.classList.contains("sidebar-open");
            if (!isSidebarOpen) return;

            const sidebarEl = document.getElementById("adminSidebar");
            const toggleBtn = e.target.closest("[data-sidebar-toggle]");

            if (sidebarEl && sidebarEl.contains(e.target)) return;
            if (toggleBtn) return;

            document.body.classList.remove("sidebar-open");
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>

            <AdmSidebar></AdmSidebar>

            <main className="admin-main">
                <Admheader></Admheader>

                <Outlet></Outlet>

                <Admfooter></Admfooter>
            </main>

        </>
    )
}