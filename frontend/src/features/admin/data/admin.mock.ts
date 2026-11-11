import type { AdminIconName } from "../components/AdminIcon/AdminIcon";

export interface AdminProfile {
    firstName: string;
    lastName: string;
    role: string;
    image: string;
}

export type AdminAccent = "blue" | "gold" | "amber" | "green";

export type AdminTone = "positive" | "warning" | "neutral";

export interface AdminMetric {
    id: string;
    label: string;
    value: string;
    change: string;
    tone: AdminTone;
    icon: AdminIconName;
    progress: number;
    accent: AdminAccent;
}

export interface AdminSalesPoint {
    label: string;
    value: number;
    amount: string;
    highlight?: boolean;
}

export interface AdminCategoryShare {
    label: string;
    percent: number;
    accent: AdminAccent;
}

export type AdminOrderStatus =
    | "Paid"
    | "Pending"
    | "Shipped"
    | "Delivered";

export interface AdminOrder {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: AdminOrderStatus;
    date: string;
    items: number;
}

export interface AdminTopProduct {
    id: string;
    title: string;
    category: string;
    price: number;
    sold: number;
    image: string;
}

export interface AdminHealthMetric {
    label: string;
    value: string;
    tone?: AdminTone;
}

export const adminProfileMock: AdminProfile = {
    firstName: "Alex",
    lastName: "Sterling",
    role: "Chief Editor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200"
};

export const adminMetrics: AdminMetric[] = [
    {
        id: "customers",
        label: "Total customers",
        value: "12,842",
        change: "+12.4%",
        tone: "positive",
        icon: "group",
        progress: 76,
        accent: "blue"
    },
    {
        id: "revenue",
        label: "Total revenue",
        value: "$84,210",
        change: "+8.2%",
        tone: "positive",
        icon: "payments",
        progress: 62,
        accent: "gold"
    },
    {
        id: "pending",
        label: "Pending orders",
        value: "156",
        change: "Active",
        tone: "warning",
        icon: "local_shipping",
        progress: 30,
        accent: "amber"
    }
];

export const adminSalesWeek: AdminSalesPoint[] = [
    { label: "Mon", value: 42, amount: "$8.4k" },
    { label: "Tue", value: 68, amount: "$12.1k" },
    { label: "Wed", value: 92, amount: "$16.8k", highlight: true },
    { label: "Thu", value: 54, amount: "$10.2k" },
    { label: "Fri", value: 78, amount: "$14.6k" },
    { label: "Sat", value: 46, amount: "$9.1k" },
    { label: "Sun", value: 61, amount: "$11.7k" }
];

export const adminCategories: AdminCategoryShare[] = [
    { label: "Beauty", percent: 34, accent: "blue" },
    { label: "Fragrances", percent: 28, accent: "gold" },
    { label: "Furniture", percent: 23, accent: "amber" },
    { label: "Groceries", percent: 15, accent: "green" }
];

export const adminRecentOrders: AdminOrder[] = [
    {
        id: "#10428",
        customer: "Marcus Vane",
        email: "m.vane@noir.com",
        total: 248,
        status: "Paid",
        date: "Nov 10",
        items: 3
    },
    {
        id: "#10427",
        customer: "Elena Rossi",
        email: "elena@techflow.io",
        total: 129.5,
        status: "Pending",
        date: "Nov 10",
        items: 1
    },
    {
        id: "#10426",
        customer: "Julian Thorne",
        email: "j.thorne@global.net",
        total: 412.75,
        status: "Shipped",
        date: "Nov 09",
        items: 5
    },
    {
        id: "#10425",
        customer: "Maya Chen",
        email: "maya.chen@studio.co",
        total: 86,
        status: "Delivered",
        date: "Nov 08",
        items: 2
    }
];

export const adminTopProducts: AdminTopProduct[] = [
    {
        id: "ck-one",
        title: "Calvin Klein CK One",
        category: "Fragrances",
        price: 49.99,
        sold: 184,
        image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
    },
    {
        id: "coco-noir",
        title: "Chanel Coco Noir",
        category: "Fragrances",
        price: 129.99,
        sold: 146,
        image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
    },
    {
        id: "colombo-sofa",
        title: "Annibale Colombo Sofa",
        category: "Furniture",
        price: 2499.99,
        sold: 98,
        image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
    },
    {
        id: "lash-princess",
        title: "Essence Mascara",
        category: "Beauty",
        price: 9.99,
        sold: 121,
        image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    }
];

export const adminHealth: AdminHealthMetric[] = [
    { label: "API status", value: "Operational", tone: "positive" },
    { label: "Latency", value: "14 ms" },
    { label: "Uptime", value: "99.9%" },
    { label: "Database", value: "Healthy", tone: "positive" }
];
