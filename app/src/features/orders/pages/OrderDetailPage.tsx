import { useParams }
from "react-router-dom"

import { useAuth }
from "../../auth/context/useAuth"

import {
  getOrderById
}
from "../services/orders.service"

import {
  ProfileSection
}
from "../../profile/components/ProfileSection/ProfileSection"

import {
  OrderDetailHeader
}
from "../components/OrderDetailHeader/OrderDetailHeader"

import {
  OrderSummaryCard
}
from "../components/OrderSummaryCard/OrderSummaryCard"

import {
  ShippingInfoCard
}
from "../components/ShippingInfoCard/ShippingInfoCard"

import {
  OrderItemsList
}
from "../components/OrderItemsList/OrderItemsList"

import "./OrderDetailPage.css"

export const OrderDetailPage = () => {

  const { id } =
    useParams()

  const { user } =
    useAuth()

  if (!user || !id) {
    return null
  }

  const order =
    getOrderById(
      user.id,
      id
    )

  if (!order) {
    return (
      <div>
        Order not found.
      </div>
    )
  }

  return (
    <section className="order-detail-page">

      <OrderDetailHeader
        order={order}
      />

      <ProfileSection>

        <OrderSummaryCard
          totalItems={order.totalItems}
          total={order.total}
        />

      </ProfileSection>

      <ProfileSection>

        <h2>
          Shipping Information
        </h2>

        <ShippingInfoCard
          order={order}
        />

      </ProfileSection>

      <ProfileSection>

        <h2>
          Ordered Items
        </h2>

        <OrderItemsList
          items={order.items}
        />

      </ProfileSection>

    </section>
  )
}