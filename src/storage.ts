// src/storage.ts
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  category?: string;
  badge?: string;
  store?: string;
};

export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};

export type Order = {
  id: number;
  userId: number;
  productId: number;
  fullName: string;
  quantity: number;
  address: string;
  email: string;
  paymentInfo: string;
  orderDate: string;
};

// Initialize localStorage → always reset products
export function initializeStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  // 🔥 Delete old products + insert fresh list
  localStorage.removeItem("products");
  localStorage.setItem("products", JSON.stringify(defaultProducts));

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
  }
}

// Default products (reset list)
const defaultProducts: Product[] = [
  { id: 1, name: "Big Mac", price: 5.99, image: "/assets/big-mac-food.jpeg", originalPrice: 6.99, rating: 4.5, reviews: 1200, category: "Fast Food", badge: "HOT", store: "McDonald's" },
  { id: 2, name: "KFC Chicken", price: 7.49, image: "/assets/kfc-chicken.jpeg", originalPrice: 8.49, rating: 4.6, reviews: 980, category: "Fast Food", badge: "SPICY", store: "KFC" },
  { id: 3, name: "Pizza", price: 9.99, image: "/assets/pizza.jpeg", originalPrice: 12.99, rating: 4.7, reviews: 1345, category: "Fast Food", badge: "BESTSELLER", store: "Pizza Hut" },
  { id: 4, name: "Latte", price: 3.49, image: "/assets/latte.jpeg", originalPrice: 4.49, rating: 4.3, reviews: 890, category: "Beverage", badge: "NEW", store: "Starbucks" },
  { id: 5, name: "Blue Bottle Coffee", price: 4.99, image: "/assets/bluee-bottle-coffe.jpeg", originalPrice: 5.99, rating: 4.6, reviews: 670, category: "Beverage", badge: "ORGANIC", store: "Blue Bottle" },
  { id: 6, name: "Espresso", price: 2.99, image: "/assets/essperaso.jpeg", originalPrice: 3.49, rating: 4.2, reviews: 540, category: "Beverage", badge: "CLASSIC", store: "Cafe Nero" },
  { id: 7, name: "Organic Banana", price: 1.2, image: "/assets/organic-banana.jpeg", originalPrice: 1.5, rating: 4.5, reviews: 300, category: "Fruit", badge: "FRESH", store: "Local Market" },
  { id: 8, name: "Milk", price: 1.5, image: "/assets/milk.jpeg", originalPrice: 1.8, rating: 4.3, reviews: 420, category: "Dairy", badge: "FRESH", store: "Dairy Farm" },
  { id: 9, name: "Wheat Bread", price: 2.2, image: "/assets/wheat-bread.jpeg", originalPrice: 2.5, rating: 4.4, reviews: 310, category: "Bakery", badge: "HEALTHY", store: "Bakery House" },
  { id: 10, name: "Heineken", price: 3, image: "/assets/heinken.jpeg", originalPrice: 3.5, rating: 4.2, reviews: 450, category: "Beverage", badge: "POPULAR", store: "Heineken Store" },
  { id: 11, name: "Vodka", price: 12, image: "/assets/vodka.jpeg", originalPrice: 15, rating: 4.7, reviews: 780, category: "Beverage", badge: "PREMIUM", store: "Liquor Store" },
  { id: 12, name: "Whisky", price: 18.5, image: "/assets/whisky.jpeg", originalPrice: 22, rating: 4.8, reviews: 650, category: "Beverage", badge: "PREMIUM", store: "Liquor Store" },
  { id: 13, name: "Nike Air Force", price: 120, image: "/assets/nike-air-force.jpeg", originalPrice: 150, rating: 4.9, reviews: 980, category: "Shoes", badge: "TRENDING", store: "Nike Store" },
  { id: 14, name: "Nike Shoes", price: 90, image: "/assets/nike.jpeg", originalPrice: 110, rating: 4.8, reviews: 870, category: "Shoes", badge: "POPULAR", store: "Nike Store" },
  { id: 15, name: "Puma Shoes", price: 85, image: "/assets/puma.jpeg", originalPrice: 105, rating: 4.7, reviews: 620, category: "Shoes", badge: "BESTSELLER", store: "Puma Store" },
  { id: 16, name: "Levis Jeans", price: 60, image: "/assets/levis.jpeg", originalPrice: 75, rating: 4.6, reviews: 540, category: "Clothing", badge: "CLASSIC", store: "Levis Store" },
  { id: 17, name: "H&M Clothes", price: 45, image: "/assets/hm-clothes.jpeg", originalPrice: 55, rating: 4.4, reviews: 410, category: "Clothing", badge: "FASHION", store: "H&M" },
  { id: 18, name: "Zara Shirt", price: 50, image: "/assets/zara.jpeg", originalPrice: 65, rating: 4.5, reviews: 480, category: "Clothing", badge: "TRENDING", store: "Zara" },
  { id: 19, name: "Uniqlo T-Shirt", price: 25, image: "/assets/uniqlo-t-shirt.jpeg", originalPrice: 30, rating: 4.3, reviews: 350, category: "Clothing", badge: "POPULAR", store: "Uniqlo" },
  { id: 20, name: "Premium Wireless Headphones", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", rating: 4.8, reviews: 2847, category: "Electronics", badge: "BEST SELLER", store: "TechHub Electronics" },
  { id: 21, name: "Designer Leather Jacket", price: 199, originalPrice: 299, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", rating: 4.9, reviews: 1523, category: "Fashion", badge: "LIMITED", store: "Fashion Forward" },
  { id: 22, name: "Organic Coffee Blend", price: 24, originalPrice: 32, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", rating: 4.7, reviews: 892, category: "Food & Beverage", badge: "ORGANIC", store: "Bean There Coffee" },
  { id: 23, name: "Smart Fitness Watch", price: 249, originalPrice: 349, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", rating: 4.6, reviews: 3241, category: "Fitness", badge: "NEW", store: "FitTech Store" },
  { id: 24, name: "Artisan Skincare Set", price: 89, originalPrice: 120, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", rating: 4.9, reviews: 756, category: "Beauty", badge: "TRENDING", store: "Pure Beauty Co" },
  { id: 25, name: "Professional Kitchen Knife", price: 149, originalPrice: 199, image: "https://images.unsplash.com/photo-1594736797933-d0901ba2fe65?w=400&h=400&fit=crop", rating: 4.8, reviews: 1087, category: "Kitchen", badge: "CHEF'S CHOICE", store: "Culinary Masters" },
  { id: 26, name: "Vintage Denim Jeans", price: 79, originalPrice: 120, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", rating: 4.5, reviews: 634, category: "Fashion", badge: "VINTAGE", store: "Retro Threads" },
  { id: 27, name: "Gaming Mechanical Keyboard", price: 159, originalPrice: 220, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop", rating: 4.7, reviews: 2156, category: "Gaming", badge: "GAMER'S PICK", store: "GameZone Pro" }
];
