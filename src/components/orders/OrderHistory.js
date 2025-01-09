import React, { useEffect } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

const OrderHistory = () => {
  const { orders, loading, error, fetchOrders } = useCart();

  useEffect(() => {
    fetchOrders(); // Refresh orders when component mounts
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case "pending":
        return <ClockIcon className="h-6 w-6 text-yellow-500" />;
      case "cart":
        return <ClockIcon className="h-6 w-6 text-blue-500" />;
      case "cancelled":
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Loading orders...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Error loading orders
        </h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No orders yet
        </h2>
        <p className="text-gray-600">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Order ID</div>
                  <div className="text-lg font-medium text-gray-900">
                    {order.id}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium capitalize text-gray-900">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          $
                          {(
                            parseInt(item.product.price) * item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total: </span>
                    <span className="text-lg font-medium text-gray-900">
                      $
                      {order.items
                        .reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
