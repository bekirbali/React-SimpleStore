export const API_BASE_URL = "https://django-simplestoreapi.onrender.com/api";

export const endpoints = {
  products: `${API_BASE_URL}/products/`,
  cart: `${API_BASE_URL}/cart/`,
  orders: `${API_BASE_URL}/orders/`,
};

export const getAuthHeaders = () => {
  // Get the CSRF token from the cookie if it exists
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  return {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken || "",
  };
};
