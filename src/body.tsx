import { useEffect, useState } from "react";
import { MapPin, Star, Heart } from "lucide-react";
import type { Product } from "./storage";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const products = localStorage.getItem("products");
    if (products) {
      setFeaturedProducts(JSON.parse(products));
    }
  }, []);

  const renderStars = (rating: number = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? "#fbbf24" : "none"}
        className={`${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const getBadgeColor = (badge?: string) => {
    const colors: Record<string, string> = {
      "BEST SELLER": "bg-red-500",
      "LIMITED": "bg-purple-500",
      "ORGANIC": "bg-green-500",
      "NEW": "bg-blue-500",
      "TRENDING": "bg-pink-500",
      "CHEF'S CHOICE": "bg-orange-500",
      "VINTAGE": "bg-amber-600",
      "GAMER'S PICK": "bg-cyan-500",
      "HOT": "bg-red-500",
      "SPICY": "bg-orange-500",
      "CLASSIC": "bg-gray-500"
    };
    return badge && colors[badge] ? colors[badge] : "bg-gray-500";
  };

  const displayedProducts = featuredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-gray-50 to-white">
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            Featured Collections
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Handpicked products from the world's most trusted brands
          </p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
               
                
                // 👈 navigate with product id
                className="group bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent navigation
                      alert("❤️ Added to Wishlist");
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-red-50 transition-all duration-300 group-hover:scale-110"
                  >
                    <Heart
                      size={18}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    />
                  </button>

                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 ${getBadgeColor(
                        product.badge
                      )} text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    {product.category}
                  </p>

                  <h4 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-purple-700">
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} className="text-red-500" />
                    <p className="text-sm font-medium">{product.store}</p>
                  </div>

                  <button
                    onClick={() => navigate(`/Product/${product.id}`)} 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {visibleCount < featuredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all"
            >
              More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
