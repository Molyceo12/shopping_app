import React from "react";
import { ShoppingCart, Truck, Shield, Star } from "lucide-react";

const WhyChoose: React.FC = () => {
  const features = [
    {
      icon: <ShoppingCart size={28} className="text-purple-600" />,
      title: "Wide Variety",
      description: "From food to fashion, shop everything in one place.",
    },
    {
      icon: <Truck size={28} className="text-purple-600" />,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and reliably.",
    },
    {
      icon: <Shield size={28} className="text-purple-600" />,
      title: "Secure Payments",
      description: "Pay safely with multiple payment options.",
    },
    {
      icon: <Star size={28} className="text-purple-600" />,
      title: "Trusted by Thousands",
      description: "Join a growing community of happy shoppers.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Why Choose <span className="text-purple-600">MarketFlow?</span>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          Discover why thousands of shoppers love MarketFlow for their daily needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-4 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-4 rounded-full bg-purple-100">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
