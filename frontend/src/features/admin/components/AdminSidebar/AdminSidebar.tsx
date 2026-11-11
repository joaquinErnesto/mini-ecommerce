import { Link } from "react-router-dom";
import { AdminIcon } from "../AdminIcon/AdminIcon";
import { AdminIdentity } from "../AdminIdentity/AdminIdentity";
import { SidebarNavItem } from "../SidebarNavItem/SidebarNavItem";
import type { AdminProfile } from "../../data/admin.mock";
import "./AdminSidebar.css";

interface AdminSidebarProps {
    admin: AdminProfile;
    isOpen: boolean;
    onClose: () => void;
    onNewProduct?: () => void;
}

export function AdminSidebar({
    admin,
    isOpen,
    onClose,
    onNewProduct
}: AdminSidebarProps) {
    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    className="admin-sidebar-overlay"
                    aria-label="Close navigation menu"
                    onClick={onClose}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    isOpen ? "admin-sidebar--open" : ""
                }`}
                aria-label="Admin navigation"
            >
                <div className="admin-sidebar__heading">
                    <div className="admin-sidebar__title">
                        <h1>Admin Panel</h1>
                        <p>Management Console</p>
                    </div>
                </div>

                <nav className="admin-sidebar__navigation">
                    <SidebarNavItem
                        to="/admin"
                        label="Overview"
                        icon="dashboard"
                        end
                        onNavigate={onClose}
                    />

                    <SidebarNavItem
                        to="/products"
                        label="Products"
                        icon="inventory_2"
                        onNavigate={onClose}
                    />

                    <SidebarNavItem
                        to="/profile/orders"
                        label="Orders"
                        icon="shopping_bag"
                        onNavigate={onClose}
                    />

                    <a
                        className="admin-sidebar-link"
                        href="#sales-overview"
                        onClick={onClose}
                    >
                        <AdminIcon name="monitoring" />
                        <span>Analytics</span>
                    </a>
                </nav>

                <div className="admin-sidebar__bottom">
                    <button
                        type="button"
                        className="admin-sidebar__new-product"
                        onClick={onNewProduct}
                        disabled={!onNewProduct}
                        title={
                            onNewProduct
                                ? "Create a new product"
                                : "Product creation route is not implemented yet"
                        }
                    >
                        <AdminIcon name="add" />
                        <span>New Product</span>
                    </button>

                    <Link
                        className="admin-sidebar__back"
                        to="/"
                        onClick={onClose}
                    >
                        <AdminIcon name="arrow_back" />
                        <span>Back to store</span>
                    </Link>

                    <AdminIdentity admin={admin} />
                </div>
            </aside>
        </>
    );
}
