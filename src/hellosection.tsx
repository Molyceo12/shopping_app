import React from "react";
import { ShoppingBag, Star, Gift, Zap } from "lucide-react";

const HelloSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden  shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-10 mb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Marketplace</span>
        </h1>
        <p className="text-lg max-w-2xl">
          Discover hand-picked products, exclusive deals, and the latest trends.
          Your one-stop shop for everything you love.
        </p>

        {/* Static highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-transform">
            <ShoppingBag className="w-8 h-8 mb-2 text-yellow-300" />
            <span className="font-semibold">10k+ Products</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-transform">
            <Star className="w-8 h-8 mb-2 text-green-300" />
            <span className="font-semibold">Top Rated Sellers</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-transform">
            <Gift className="w-8 h-8 mb-2 text-pink-300" />
            <span className="font-semibold">Daily Rewards</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-transform">
            <Zap className="w-8 h-8 mb-2 text-blue-300" />
            <span className="font-semibold">Fast Delivery</span>
          </div>
        </div>

        {/* Call to action */}
        <button className="mt-8 px-8 py-3 rounded-full bg-yellow-300 text-purple-900 font-bold text-lg shadow-lg hover:bg-yellow-400 transition-all">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default HelloSection;
