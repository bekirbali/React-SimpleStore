import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(null);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 9999) return;
    setUpdating(productId);
    try {
      updateQuantity(productId, newQuantity);
    } finally {
      setUpdating(null);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number(parseFloat(item.product.price || 0).toFixed(2));
        const quantity = Number(item.quantity);
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const formatPrice = (price) => {
    return Number(parseFloat(price || 0).toFixed(2));
  };

  const handleDelete = (productId) => {
    removeFromCart(productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Sepetiniz boş
        </h2>
        <p className="text-gray-600 mb-8">Sepete ürün ekleyerek başlayın.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ürünler sayfasına git
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Sepetim</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => {
            const price = formatPrice(item.product.price);
            return (
              <div
                key={item.product.id}
                className="p-6 flex items-center space-x-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.product.code}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Birim Tipi: {item.product.unit_type}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity - 1)
                      }
                      disabled={
                        updating === item.product.id || item.quantity <= 1
                      }
                      className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
                        updating === item.product.id || item.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 text-center border rounded-md"
                      disabled={updating === item.product.id}
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity + 1)
                      }
                      disabled={
                        updating === item.product.id || item.quantity >= 9999
                      }
                      className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
                        updating === item.product.id || item.quantity >= 9999
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-800">
                      ${(price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${price.toFixed(2)} adet
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Toplam</span>
            <span className="text-2xl font-bold text-gray-900">
              ${calculateTotal()}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">Toplam</span>
              <span className="text-xl font-semibold text-gray-900">
                ${calculateTotal()}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                Sipariş Ver
              </Link>
              <Link
                to="/"
                className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
              >
                Alışverişe devam et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
