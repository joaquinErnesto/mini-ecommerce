import "./AdminIcon.css";

export type AdminIconName =
    | "group"
    | "inventory_2"
    | "shopping_bag"
    | "monitoring"
    | "dashboard"
    | "add"
    | "search"
    | "notifications"
    | "settings"
    | "menu"
    | "close"
    | "arrow_back"
    | "arrow_forward"
    | "north_east"
    | "payments"
    | "local_shipping"
    | "receipt_long"
    | "trending_up"
    | "dns"
    | "auto_awesome"
    | "donut_large"
    | "check_circle"
    | "schedule"
    | "bolt"
    | "cloud_done";

interface AdminIconProps {
    name: AdminIconName;
    className?: string;
}

export function AdminIcon({
    name,
    className = ""
}: AdminIconProps) {
    return (
        <span
            className={`material-symbols-outlined admin-icon ${className}`}
            aria-hidden="true"
        >
            {name}
        </span>
    );
}
