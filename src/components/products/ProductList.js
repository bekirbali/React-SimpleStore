import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, products, loading, error, cartItems, createProduct } =
    useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    price: "",
    description: "",
    image: null,
    unit: "pcs",
    stock: "0",
  });
  const [createError, setCreateError] = useState("");

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      // Validate price
      if (
        isNaN(parseFloat(newProduct.price)) ||
        parseFloat(newProduct.price) <= 0
      ) {
        setCreateError("Please enter a valid price greater than 0");
        return;
      }

      // Validate stock
      if (isNaN(parseInt(newProduct.stock)) || parseInt(newProduct.stock) < 0) {
        setCreateError("Stock must be a non-negative number");
        return;
      }

      // Validate required fields
      if (!newProduct.name.trim() || !newProduct.unit) {
        setCreateError("Name and unit are required");
        return;
      }

      await createProduct(newProduct);
      setIsModalOpen(false);
      setNewProduct({
        name: "",
        code: "",
        price: "",
        description: "",
        image: null,
        unit: "pcs",
        stock: "0",
      });
      setCreateError(""); // Clear any previous errors
    } catch (err) {
      setCreateError(
        err.response?.data?.message ||
          "Error creating product. Please check all fields are correct."
      );
    }
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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-4">
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
            {createError && (
              <div className="mb-4 text-red-600">{createError}</div>
            )}
            <form onSubmit={handleCreateProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit *
                  </label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.unit}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit: e.target.value })
                    }
                  >
                    <option value="kg">Kilogram</option>
                    <option value="g">Gram</option>
                    <option value="l">Liter</option>
                    <option value="ml">Milliliter</option>
                    <option value="pcs">Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Code
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.code}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, code: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock *
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image *
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    className="mt-1 block w-full"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <div className="aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover bg-gray-100"
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
