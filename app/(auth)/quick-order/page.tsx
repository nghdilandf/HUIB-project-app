"use client"
import React, { useState, useEffect } from "react";
import { products } from "../../../public/assets/assets"; 
import Image, { StaticImageData } from "next/image";
import { useRouter } from 'next/navigation'; 
import { useCart } from '@/app/(auth)/cart-context'; 

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

const categories = [
  "all",
  ...Array.from(new Set(products.map((p: Product) => p.category)))
];

const QuickOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0); 
  const [showTopBtn, setShowTopBtn] = useState(false);

  const { cartItems, addToCart } = useCart(); 
  const router = useRouter(); 

  // Set initial max price for slider from products
  useEffect(() => {
    if (products.length > 0) {
      const maxProductPrice = Math.max(...products.map((p: Product) => p.price));
      if (isFinite(maxProductPrice)) {
        setMaxPrice(maxProductPrice);
      }
    } else {
        setMaxPrice(1000); 
    }
  }, []); 

  // Show or hide back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products
  const filtered = products.filter((p: Product) => {
    const inCategory = selectedCategory === "all" || p.category === selectedCategory;
    const inPrice = p.price >= minPrice && (maxPrice > 0 ? p.price <= maxPrice : true);
    return inCategory && inPrice;
  });

  // Add to cart using context
  const handleAdd = (product: Product) => {
    const itemForCart = { 
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1, 
      // image: product.image[0] 
    };
    addToCart(itemForCart);
  };

  // Calculate total items and cost from context's cartItems
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="w-4/5 mx-auto flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-[#ff2c2c]">Quick Order</h1>
        <button 
          onClick={() => router.push('/cart')} 
          className="relative flex items-center gap-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
        >
          <span>Cart</span>
          <span className="bg-[#ff2c2c] text-white rounded-full px-2 py-0.5 text-xs font-bold">{totalItems}</span>
          <span className="ml-2 font-semibold">{totalCost.toLocaleString()} FCFA</span>
        </button>
      </div>
      <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border rounded px-4 py-2">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}chnung
        </select>
        <div className="flex items-center gap-2">
          <label>Min Price:</label>
          <input type="number" min={0} max={maxPrice > 0 ? maxPrice : undefined} value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
          <label>Max Price:</label>
          <input type="number" min={minPrice} max={maxPrice > 0 ? maxPrice : undefined} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
        </div>
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((product: Product) => (
          <div key={product._id} className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center shadow-sm">
            <Image 
              src={product.image[0]} 
              alt={product.name} 
              className="w-24 h-24 object-cover rounded mb-2" 
              width={96} 
              height={96} 
            />
            <div className="font-semibold text-lg text-center mb-2">{product.name}</div>
            <div className="text-[#ff2c2c] font-bold text-lg mb-3">{product.price.toLocaleString()} FCFA</div>
            <button 
              className="bg-[#ff2c2c] text-white px-4 py-1 rounded hover:bg-[#e01b1b] transition font-semibold" 
              onClick={() => handleAdd(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center text-gray-500">No items found.</div>}
      </div>
      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#ff2c2c] text-white rounded-full p-4 shadow-lg hover:bg-[#e01b1b] transition z-50"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default QuickOrder;
