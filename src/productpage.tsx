// src/ProductPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Store, Star, ChevronLeft } from "lucide-react";
import type { Product, CartItem, User } from "./storage";
import Header from "./header";
import Footer from "./footer";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    const prod = products.find((p) => p.id === Number(id));
    setProduct(prod || null);
  }, [id]);

  const handleAddToCart = () => {
    const loggedInUser: User | null = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (!loggedInUser) {
      alert("Please login to add to cart");
      return;
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(
      (item) => item.userId === loggedInUser.id && item.productId === product?.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else if (product) {
      cart.push({
        id: Date.now(),
        userId: loggedInUser.id,
        productId: product.id,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p className="mt-2 text-gray-500">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-6 flex items-center justify-center mx-auto text-purple-600 hover:text-purple-800"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Dummy reviews data
  const reviews = [
    { name: "Alice Johnson", comment: "Amazing product! Highly recommend.", rating: 5, date: "2023-10-15" },
    { name: "Bob Smith", comment: "Good quality, fast delivery. Will shop again.", rating: 4, date: "2023-09-28" },
    { name: "Charlie Brown", comment: "Value for money. Exactly as described.", rating: 5, date: "2023-09-10" },
    { name: "Diana Miller", comment: "Excellent product with great durability.", rating: 5, date: "2023-08-22" },
  ];

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="hover:text-purple-600">Home</a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="flex items-center">
              <a href="/products" className="hover:text-purple-600">Products</a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800">{product.category || "Category"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg bg-gray-200 border-2 border-transparent hover:border-purple-500 cursor-pointer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill={star <= Math.floor(averageRating) ? "#fbbf24" : "none"}
                        className={star <= Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 font-medium">{averageRating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">{reviews.length} reviews</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">500+ sold</span>
                </div>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-purple-700">${product.price.toFixed(2)}</p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="ml-3 text-lg text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-6 text-gray-600">
                  <MapPin size={20} className="text-red-500" />
                  <Store size={20} className="text-purple-600" />
                  <span className="font-medium">Store: Texas, TX 023</span>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="mt-2 text-gray-600">
                    {"This premium product offers exceptional quality and value. Designed to last with attention to detail and craftsmanship."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-4 text-lg font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-8">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg ${
                      added ? "bg-green-600" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {added ? "✔ Added to Cart" : "Add to Cart"}
                  </button>
                </div>

                {/* Store Info */}
                

                {/* Location Map */}
                
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 mt-8 pt-8 px-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            
            {/* Rating Summary */}
            <div className="flex items-start mb-8">
              <div className="mr-12 text-center">
                <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= Math.floor(averageRating) ? "#fbbf24" : "none"}
                      className={star <= Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="text-gray-500 text-sm mt-1">{reviews.length} reviews</div>
              </div>
              
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter(r => Math.round(r.rating) === rating).length;
                  const percentage = (count / reviews.length) * 100;
                  
                  return (
                    <div key={rating} className="flex items-center mb-1">
                      <div className="w-10 text-sm text-gray-600">{rating} star</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div 
                          className="h-2 bg-yellow-400 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-sm text-gray-600">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{review.name}</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            fill={star <= review.rating ? "#fbbf24" : "none"}
                            className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-600 mt-3">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductPage;