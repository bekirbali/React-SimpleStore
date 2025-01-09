import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, products, loading, error, cartItems } = useCart();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    addToCart({
      product,
      quantity: existingCartItem ? existingCartItem.quantity + 1 : 1,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search products by name or code..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain bg-gray-100"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="text-sm text-gray-500">{product.code}</div>
                <Link
                  to={`/product/${product.id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                  {product.name}
                </Link>
                <div className="mt-2 text-lg font-semibold text-gray-900">
                  ${product.price}
                </div>
                {product.description && (
                  <div className="mt-2 text-sm text-gray-600 truncate">
                    {product.description}
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
