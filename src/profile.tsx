// src/Profile.tsx
import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import type { Order, User, Product } from "./storage";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Load logged-in user and products
  useEffect(() => {
    const loggedInUser: User | null = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    setUser(loggedInUser);

    const allProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(allProducts);

    if (loggedInUser?.email) {
      const allOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
      const userOrders = allOrders.filter((order) => order.email === loggedInUser.email);
      setOrders(userOrders);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    alert("Logged out successfully ✅");
    window.location.href = "/login";
  };

  const handleCancelOrder = (orderId: number) => {
    const allOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrders = allOrders.filter((order) => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Profile Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-4xl font-bold text-purple-700">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="text-2xl font-semibold">{user?.username || "Username"}</h2>
          <p className="text-gray-500">{user?.email || "email@example.com"}</p>
          <p className="text-gray-400">Kigali, Rwanda</p>
          <button
            onClick={handleLogout}
            className="mt-2 w-full py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div className="mt-8 w-full max-w-3xl space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => {
              const product = products.find((p) => p.id === order.productId);

              return (
                <div
                  key={order.id}
                  className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 font-bold text-lg">{product?.name?.charAt(0) || "P"}</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{product?.name || "Product Name"}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Full Name: {order.fullName}</p>
                    <p>Address: {order.address}</p>
                    <p>Payment: {order.paymentInfo}</p>
                    <p className="text-gray-400 text-sm">
                      Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="py-2 px-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
