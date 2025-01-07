import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { dummyProducts } from "../../data/dummyData";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = dummyProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct || null);
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
    });
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Product not found
        </h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-96 w-full object-cover md:w-96"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-gray-500">
              {product.code}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="mt-4 text-gray-600">{product.description}</p>
            <div className="mt-4">
              <span className="text-gray-600">Unit Type: </span>
              <span className="font-medium">{product.unit_type}</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Price: </span>
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  min="1"
                  id="quantity"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
