import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { AdminIcon } from "../AdminIcon/AdminIcon";

import { RouteLoader } from "../../../../components/RouteLoader/RouteLoader";

import { adminProfileMock } from "../../data/admin.mock";

import "../../style/admin-theme.css";
import "./AdminDashboardLayout.css";

export function AdminDashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar
                admin={adminProfileMock}
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            <div className="admin-dashboard__main">
                <div className="admin-dashboard__content">
                    <Suspense fallback={<RouteLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>

            <button
                type="button"
                className="admin-dashboard__menu-toggle"
                aria-label="Open admin navigation"
                onClick={openSidebar}
            >
                <AdminIcon name="menu" />
                <span>Menu</span>
            </button>
        </div>
    );
}
