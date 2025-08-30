// src/Footer.tsx
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const socialIcon = (icon: React.ReactNode) => (
    <div className="p-3 bg-white/25 rounded-full hover:bg-white/40 transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );

  return (
    <footer className="w-full bg-gradient-to-t from-purple-900 via-purple-800 to-purple-900 text-white py-16 px-8">
      {/* Top Section */}
      <div className="flex flex-wrap gap-16 justify-between max-w-7xl mx-auto">
        {/* Company Info */}
        <div className="flex-1 min-w-[280px]">
          <h2 className="text-3xl font-extrabold mb-4">MarketFlow</h2>
          <p className="text-base text-white/70 leading-relaxed">
            MarketFlow is your ultimate online marketplace. Explore shoes,
            clothes, coffee, liquor, groceries, and food from top brands
            delivered straight to your doorstep. Shop safely, quickly, and
            conveniently with us.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[280px]">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-base text-white/70 mb-2">Email: support@marketflow.com</p>
          <p className="text-base text-white/70 mb-2">Phone: +1 234 567 890</p>
          <p className="text-base text-white/70">Address: 123 Market St, City, Country</p>
        </div>

        {/* Social + Newsletter */}
        <div className="flex-1 min-w-[280px]">
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-6">
            {socialIcon(<Facebook color="white" size={24} />)}
            {socialIcon(<Instagram color="white" size={24} />)}
            {socialIcon(<Twitter color="white" size={24} />)}
          </div>
          <p className="text-base text-white/70 mb-2">Subscribe to our newsletter for latest updates</p>
          <div className="flex gap-3 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md bg-purple-800 text-white placeholder-white/60 border-none outline-none text-base"
            />
            <button className="bg-orange-400 px-6 py-3 rounded-md text-white font-bold hover:bg-orange-500 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white/40 my-12 max-w-7xl mx-auto" />

      {/* Bottom Section */}
      <p className="text-center text-sm text-white/60">
        © 2024 MarketFlow. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
