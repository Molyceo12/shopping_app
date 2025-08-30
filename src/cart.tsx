// src/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { Product, CartItem, User } from "./storage";
import Header from "./header";
import Footer from "./footer";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const loggedInUser: User | null = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    setUserId(loggedInUser?.id ?? null);
    if (!loggedInUser) return;

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const productList: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const userCart = cart.filter((item) => item.userId === loggedInUser.id);
    const productsInCart = userCart
      .map((item) => productList.find((p) => p.id === item.productId))
      .filter((p): p is Product => !!p);

    const qtyMap: Record<number, number> = {};
    userCart.forEach((item) => {
      qtyMap[item.productId] = item.quantity;
    });

    setCartProducts(productsInCart);
    setQuantities(qtyMap);
  }, []);

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => {
      const newQty = (prev[productId] ?? 1) + change;
      if (newQty < 1) return prev;
      const updated = { ...prev, [productId]: newQty };
      const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartIndex = cart.findIndex(
        (item) => item.userId === userId && item.productId === productId
      );
      if (cartIndex >= 0) {
        cart[cartIndex].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      return updated;
    });
  };

  const handleRemove = (productId: number) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter(
      (item) => !(item.userId === userId && item.productId === productId)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartProducts((prev) => prev.filter((p) => p.id !== productId));
    setQuantities((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = cartProducts.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] ?? 1),
    0
  );
  const tax = totalPrice * 0.1;
  const shippingFee = totalPrice > 0 ? 5 : 0;
  const grandTotal = totalPrice + tax + shippingFee;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-4xl"> {/* Wider but still centered */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Your Cart
          </h1>

          {cartProducts.length === 0 ? (
            <div className="text-center text-gray-600 text-xl">
              Your cart is empty 😞
            </div>
          ) : (
            <div className="space-y-8">
              {cartProducts.map((product) => {
                const qty = quantities[product.id] ?? 1;
                return (
                  <div
                    key={product.id}
                    className="flex items-center bg-white rounded-2xl shadow-lg p-6 relative"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />

                    {/* Product Info */}
                    <div className="flex-1 ml-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {product.name}
                      </h2>
                      <p className="text-purple-600 font-bold mt-2 text-2xl">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-4 space-x-3">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-lg"
                        >
                          -
                        </button>
                        <span className="font-medium text-lg">{qty}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Icon Button */}
                    <button
  onClick={() => handleRemove(product.id)}
  className="ml-6 flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold px-3 py-2 rounded-lg border border-red-600 hover:bg-red-50 transition"
>
  <Trash2 size={20} />
  <span>Remove</span>
</button>
                  </div>
                );
              })}

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Order Summary
                </h2>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 my-3"></div>
                  <div className="flex justify-between font-bold text-2xl">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
  onClick={() =>
    navigate("/CheckoutPage1", {
      state: {
        cartProducts: cartProducts,
        quantities: quantities,
        grandTotal: grandTotal,
      },
    })
  }
  className="mt-6 w-full py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition text-lg"
>
  Proceed to Checkout
</button>

              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
