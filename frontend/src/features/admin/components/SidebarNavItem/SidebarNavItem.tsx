import { NavLink } from "react-router-dom";
import { AdminIcon, type AdminIconName } from "../AdminIcon/AdminIcon";
import "./SidebarNavItem.css";

interface SidebarNavItemProps {
    to: string;
    label: string;
    icon: AdminIconName;
    end?: boolean;
    onNavigate?: () => void;
}

export function SidebarNavItem({
    to,
    label,
    icon,
    end = false,
    onNavigate
}: SidebarNavItemProps) {
    return (
        <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
                `admin-sidebar-link ${
                    isActive ? "admin-sidebar-link--active" : ""
                }`
            }
        >
            <AdminIcon name={icon} />

            <span>{label}</span>
        </NavLink>
    );
}