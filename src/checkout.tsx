// src/CheckoutPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import type { Product, CartItem, User, Order } from "./storage";
import { User as UserIcon, Mail, CreditCard, MapPin } from "lucide-react";

type LocationState = {
  cartProducts: Product[];
  quantities: Record<number, number>;
  grandTotal: number;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [quantities, ] = useState<Record<number, number>>(state?.quantities || {});
  const [grandTotal, ] = useState<number>(state?.grandTotal || 0);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  // Load logged-in user from localStorage
  useEffect(() => {
    const user: User | null = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    console.log("DEBUG loggedInUser:", user);
    setLoggedInUser(user);
  }, []);

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const subtotal = grandTotal > 0 ? grandTotal - (grandTotal / 11) - 5 : 0;
  const tax = subtotal * 0.1;
  const shippingFee = subtotal > 0 ? 5 : 0;

  const handlePlaceOrder = () => {
    if (!name || !address || !payment) {
      alert("Please fill in all fields");
      return;
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");

    const userEmail = loggedInUser?.email ?? "unknown@example.com";

    // Map each cart item to an Order for this user
    const userOrders: Order[] = cart.map((item, index) => ({
      id: orders.length + index + 1,  // unique numeric id
      userId: 0,                      // no numeric id
      productId: item.productId,
      quantity: item.quantity,
      fullName: name,
      address,
      email: userEmail,
      paymentInfo: payment,
      orderDate: new Date().toISOString(),
    }));

    console.log("DEBUG userOrders:", userOrders);

    // Save orders and remove purchased items from cart
    localStorage.setItem("orders", JSON.stringify([...orders, ...userOrders]));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter(() => false)) // remove all items (since no numeric id)
    );

    alert("Order placed successfully ✅");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>

          {/* User Information */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Shipping & Payment</h2>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mb-3">
              <UserIcon className="text-purple-600 mr-3" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mb-3">
              <MapPin className="text-purple-600 mr-3" />
              <input
                type="text"
                placeholder="Address (e.g., Kigali, Rwanda)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mb-3">
              <Mail className="text-purple-600 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={loggedInUser?.email || ""}
                disabled
                className="flex-1 outline-none bg-gray-100"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mb-3">
              <CreditCard className="text-purple-600 mr-3" />
              <input
                type="text"
                placeholder="Payment Info"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 mt-6 space-y-2">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between"><span>Items</span><span>{totalItems}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping Fee</span><span>${shippingFee.toFixed(2)}</span></div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>

            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
