"use client"
import React, { useState, useEffect } from "react";
import { products } from "../../../public/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// --- Types ---
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: StaticImageData[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

interface QuickOrderCartItem {
  product: Product;
  quantity: number;
}

const categories = [
  "all",
  ...Array.from(new Set(products.map((p: Product) => p.category)))
];

const QuickOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [cart, setCart] = useState<QuickOrderCartItem[]>([]);

  // Set max price for slider
  useEffect(() => {
    const max = Math.max(...products.map((p: Product) => p.price));
    setMaxPrice(max);
  }, []);

  // Filter products
  const filtered = products.filter((p: Product) => {
    const inCategory = selectedCategory === "all" || p.category === selectedCategory;
    const inPrice = p.price >= minPrice && p.price <= maxPrice;
    return inCategory && inPrice;
  });

  // Add to cart
  const handleAdd = (product: Product) => {
    setCart(prev => {
      const found = prev.find((item) => item.product._id === product._id);
      if (found) {
        return prev.map(item => item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quickOrderCart", JSON.stringify(cart));
    }
  }, [cart]);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quickOrderCart");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="w-4/5 mx-auto flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-[#ff2c2c]">Quick Order</h1>
        <Link href="/quick-order/cart" className="relative flex items-center gap-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-100">
          <span>Cart</span>
          <span className="bg-[#ff2c2c] text-white rounded-full px-2 py-0.5 text-xs font-bold">{totalItems}</span>
          <span className="ml-2 font-semibold">{totalCost.toLocaleString()} FCFA</span>
        </Link>
      </div>
      {/* Filters */}
      <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border rounded px-4 py-2">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <label>Min Price:</label>
          <input type="number" min={0} max={maxPrice} value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
          <label>Max Price:</label>
          <input type="number" min={minPrice} max={maxPrice} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
        </div>
      </div>
      {/* Product Grid */}
      <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((product: Product) => (
          <div key={product._id} className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center shadow-sm">
            <Image src={product.image[0]} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" width={96} height={96} />
            <div className="font-semibold text-lg text-center mb-2">{product.name}</div>
            <div className="text-[#ff2c2c] font-bold text-lg mb-3">{product.price.toLocaleString()} FCFA</div>
            <button className="bg-[#ff2c2c] text-white px-4 py-1 rounded hover:bg-[#e01b1b] transition font-semibold" onClick={() => handleAdd(product)}>
              Add to Cart
            </button>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center text-gray-500">No items found.</div>}
      </div>
    </div>
  );
};

export default QuickOrder;
