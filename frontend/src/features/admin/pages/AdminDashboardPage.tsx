import { Link } from "react-router-dom";

import { AdminIcon } from "../components/AdminIcon/AdminIcon";

import {
    adminCategories,
    adminHealth,
    adminMetrics,
    adminProfileMock,
    adminRecentOrders,
    adminSalesWeek,
    adminTopProducts,
    type AdminOrderStatus
} from "../data/admin.mock";

import { formatPrice } from "../../products/utils/productFormat";

import "./AdminDashboardPage.css";

const statusClass: Record<AdminOrderStatus, string> = {
    Paid: "admin-badge--paid",
    Pending: "admin-badge--pending",
    Shipped: "admin-badge--shipped",
    Delivered: "admin-badge--delivered"
};

const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
}).format(new Date());

const getInitials = (name: string) =>
    name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

export function AdminDashboardPage() {
    return (
        <section className="admin-dashboard-page">
            <header className="admin-page-hero">
                <div className="admin-page-hero__copy">
                    <p className="admin-page-kicker">
                        <span
                            className="admin-page-kicker__dot"
                            aria-hidden="true"
                        />
                        {today} · Management console
                    </p>

                    <h1 className="admin-page-title">
                        Good to see you,{" "}
                        <span>{adminProfileMock.firstName}</span>.
                    </h1>

                    <p className="admin-page-lede">
                        Here is a considered look at how the store is
                        performing today, from revenue and orders to the
                        products your customers love most.
                    </p>
                </div>

                <div className="admin-page-hero__actions">
                    <Link
                        className="admin-page-button admin-page-button--ghost"
                        to="/products"
                    >
                        <AdminIcon name="inventory_2" />
                        Manage catalogue
                    </Link>

                    <Link
                        className="admin-page-button"
                        to="/profile/orders"
                    >
                        <AdminIcon name="receipt_long" />
                        Review orders
                    </Link>
                </div>
            </header>

            <div className="admin-metric-grid">
                {adminMetrics.map((metric) => (
                    <article
                        className={`admin-metric admin-metric--${metric.accent}`}
                        key={metric.id}
                    >
                        <div className="admin-metric__head">
                            <p>{metric.label}</p>

                            <span className="admin-metric__icon">
                                <AdminIcon name={metric.icon} />
                            </span>
                        </div>

                        <div className="admin-metric__value-row">
                            <strong>{metric.value}</strong>

                            <span
                                className={`admin-metric__change is-${metric.tone}`}
                            >
                                {metric.change}
                            </span>
                        </div>

                        <div
                            className="admin-metric__meter"
                            role="presentation"
                        >
                            <span
                                style={{
                                    width: `${metric.progress}%`
                                }}
                            />
                        </div>
                    </article>
                ))}
            </div>

            <div className="admin-overview-grid">
                <section
                    className="admin-panel admin-panel--sales"
                    id="sales-overview"
                    aria-labelledby="admin-sales-title"
                >
                    <div className="admin-panel__head">
                        <div>
                            <p className="admin-panel__kicker">
                                <AdminIcon name="trending_up" />
                                Performance
                            </p>

                            <h2 id="admin-sales-title">
                                Sales overview
                            </h2>

                            <p>
                                Revenue performance across the last seven
                                days.
                            </p>
                        </div>

                        <select
                            className="admin-select"
                            defaultValue="7"
                            aria-label="Sales period"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>

                    <div
                        className="admin-chart"
                        role="img"
                        aria-label="Weekly revenue bar chart"
                    >
                        {adminSalesWeek.map((point) => (
                            <div
                                className="admin-chart__col"
                                key={point.label}
                            >
                                <div className="admin-chart__track">
                                    <div
                                        className={`admin-chart__bar${
                                            point.highlight
                                                ? " is-highlight"
                                                : ""
                                        }`}
                                        style={{
                                            height: `${point.value}%`
                                        }}
                                    >
                                        <span className="admin-chart__tooltip">
                                            {point.amount}
                                        </span>
                                    </div>
                                </div>

                                <span className="admin-chart__label">
                                    {point.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    className="admin-panel admin-panel--categories"
                    aria-labelledby="admin-categories-title"
                >
                    <div className="admin-panel__head">
                        <div>
                            <p className="admin-panel__kicker">
                                <AdminIcon name="donut_large" />
                                Catalogue
                            </p>

                            <h2 id="admin-categories-title">
                                Top categories
                            </h2>

                            <p>Share of sales this month.</p>
                        </div>
                    </div>

                    <ul className="admin-category-list">
                        {adminCategories.map((category) => (
                            <li
                                className={`admin-category admin-category--${category.accent}`}
                                key={category.label}
                            >
                                <div className="admin-category__top">
                                    <span className="admin-category__label">
                                        {category.label}
                                    </span>

                                    <span className="admin-category__value">
                                        {category.percent}%
                                    </span>
                                </div>

                                <div
                                    className="admin-category__bar"
                                    role="presentation"
                                >
                                    <span
                                        style={{
                                            width: `${category.percent}%`
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="admin-category-foot">
                        <span>Active catalogue</span>
                        <strong>194 products</strong>
                    </div>
                </section>

                <section
                    className="admin-panel admin-panel--orders"
                    id="recent-orders"
                    aria-labelledby="admin-orders-title"
                >
                    <div className="admin-panel__head">
                        <div>
                            <p className="admin-panel__kicker">
                                <AdminIcon name="receipt_long" />
                                Latest activity
                            </p>

                            <h2 id="admin-orders-title">
                                Recent orders
                            </h2>

                            <p>The newest purchases across the store.</p>
                        </div>

                        <Link
                            className="admin-panel__link"
                            to="/profile/orders"
                        >
                            View all
                            <AdminIcon name="north_east" />
                        </Link>
                    </div>

                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th scope="col">Order</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminRecentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <span className="admin-table__id">
                                                {order.id}
                                            </span>

                                            <span className="admin-table__items">
                                                {order.items}{" "}
                                                {order.items === 1
                                                    ? "item"
                                                    : "items"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="admin-table__customer">
                                                <span className="admin-table__avatar">
                                                    {getInitials(
                                                        order.customer
                                                    )}
                                                </span>

                                                <span className="admin-table__customer-text">
                                                    <strong>
                                                        {order.customer}
                                                    </strong>
                                                    <span>{order.email}</span>
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-badge ${
                                                    statusClass[order.status]
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                        <td>{order.date}</td>

                                        <td className="admin-table__total">
                                            {formatPrice(order.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="admin-overview-stack">
                    <section
                        className="admin-panel admin-panel--products"
                        aria-labelledby="admin-products-title"
                    >
                        <div className="admin-panel__head">
                            <div>
                                <p className="admin-panel__kicker">
                                    <AdminIcon name="inventory_2" />
                                    Best sellers
                                </p>

                                <h2 id="admin-products-title">
                                    Top products
                                </h2>

                                <p>Most purchased pieces this week.</p>
                            </div>
                        </div>

                        <ul className="admin-product-list">
                            {adminTopProducts.map((product) => (
                                <li
                                    className="admin-product"
                                    key={product.id}
                                >
                                    <span className="admin-product__media">
                                        <img
                                            src={product.image}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </span>

                                    <span className="admin-product__copy">
                                        <span className="admin-product__title">
                                            {product.title}
                                        </span>

                                        <span className="admin-product__meta">
                                            {product.category} ·{" "}
                                            {product.sold} sold
                                        </span>
                                    </span>

                                    <span className="admin-product__price">
                                        {formatPrice(product.price)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section
                        className="admin-panel admin-panel--health"
                        aria-labelledby="admin-health-title"
                    >
                        <div className="admin-panel__head">
                            <div>
                                <p className="admin-panel__kicker">
                                    <AdminIcon name="dns" />
                                    Status
                                </p>

                                <h2 id="admin-health-title">
                                    System health
                                </h2>
                            </div>
                        </div>

                        <div className="admin-health__lead">
                            <span
                                className="admin-health__dot"
                                aria-hidden="true"
                            />

                            <div>
                                <strong>API status</strong>
                                <span>Operational · 99.9%</span>
                            </div>
                        </div>

                        <div className="admin-health__grid">
                            {adminHealth.map((item) => (
                                <div
                                    className={`admin-health__item${
                                        item.tone
                                            ? ` is-${item.tone}`
                                            : ""
                                    }`}
                                    key={item.label}
                                >
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="admin-panel admin-panel--cta">
                        <span className="admin-cta__icon">
                            <AdminIcon name="auto_awesome" />
                        </span>

                        <h2>Grow the catalogue</h2>

                        <p>
                            Curate new pieces and keep the storefront
                            feeling intentional.
                        </p>

                        <Link
                            className="admin-page-button admin-cta__button"
                            to="/products"
                        >
                            Explore products
                            <AdminIcon name="arrow_forward" />
                        </Link>
                    </section>
                </div>
            </div>
        </section>
    );
}
