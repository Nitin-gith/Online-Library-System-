import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function Layout() {

    // Closes the mobile sidebar drawer when clicking anywhere outside it.
    // Only acts when sidebar-open is actually set on <body> (mobile drawer
    // mode) - on desktop, sidebar-mini is a pinned collapse state, not an
    // overlay, so outside clicks shouldn't close it there.
    useEffect(() => {
        function handleClickOutside(e) {
            const isSidebarOpen = document.body.classList.contains("sidebar-open");
            if (!isSidebarOpen) return;

            const sidebarEl = document.getElementById("adminSidebar");
            const toggleBtn = e.target.closest("[data-sidebar-toggle]");

            // ignore clicks on the sidebar itself, or on the hamburger
            // button that opened it (that button has its own toggle logic)
            if (sidebarEl && sidebarEl.contains(e.target)) return;
            if (toggleBtn) return;

            document.body.classList.remove("sidebar-open");
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>

            <Sidebar></Sidebar>

            <main className="admin-main">
                <Header></Header>

                <Outlet></Outlet>

                <Footer></Footer>
            </main>

        </>
    )
}