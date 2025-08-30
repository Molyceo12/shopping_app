// src/Header.tsx
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setCartData] = useState<CartItem[]>([]); // For debug

  const navigate = useNavigate();

  const loadData = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (loggedInUser) {
      setIsLoggedIn(true);
      setUsername(loggedInUser.username || "User");
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }

    const rawCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cart: CartItem[] = Array.isArray(rawCart) ? rawCart : [];
    setCartData(cart); // store for debug
    setCartCount(cart.length); // count all items
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUsername(null);
    setCartCount(0);
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-5 gap-4 md:gap-0">
        {/* Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-wider cursor-pointer"
            onClick={() => navigate("/")}
          >
            MarketFlow
          </h1>
          
        </div>

        {/* User + Cart */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 flex-shrink-0">
          {isLoggedIn ? (
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <button
                className="font-semibold hover:text-yellow-300 transition-colors"
                onClick={() => navigate("/profile")}
              >
                Hello, {username}!
              </button>
              <button
                className="text-white bg-white/20 px-4 md:px-5 py-2 rounded-full font-bold hover:bg-white/30 transition-all"
            onClick={() => navigate("/")}
          >
            Home
          </button>
              <button
                onClick={handleLogout}
                className="text-white bg-white/20 px-4 md:px-5 py-2 rounded-full font-bold hover:bg-white/30 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <button
                className="font-semibold hover:text-yellow-300 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="font-semibold hover:text-yellow-300 transition-colors"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}

          <div className="relative cursor-pointer" onClick={() => navigate("/Cart")}>
            <ShoppingCart size={32} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
