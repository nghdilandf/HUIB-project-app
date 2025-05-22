'use client'
import React, { useState } from 'react'
// Assume you have an assets.js file exporting an array named products
import { products } from "../../public/assets/assets"; // Adjust the path as necessary

const categories = [
  "all", "donuts", "burgers", "ice", "poteto", "pizza", "fries", "cake", "chicken", "hot dog"
];

const navTabs = ["Popular", "Recent"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("Popular");
  const [checkedProducts, setCheckedProducts] = useState<{ [key: string]: boolean }>({});

  // Filter products by category and tab
  const filteredProducts = products.filter(
    (product: any) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (activeTab === "Popular" ? product.isPopular : product.isRecent)
  );

  const handleCheck = (id: string) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex w-full">
      <section className="w-4/5 p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Explore Categories</h2>
        {/* Categories List */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full capitalize border ${
                selectedCategory === cat
                  ? "bg-[#ff2c2c] text-white border-[#ff2c2c]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Two-sided Navigation */}
        <div className="flex gap-4 mb-6">
          {navTabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-[#ff2c2c] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="relative bg-white border rounded-lg shadow p-4">
              {/* Checkbox on top left */}
              <input
                type="checkbox"
                checked={!!checkedProducts[product.id]}
                onChange={() => handleCheck(product.id)}
                className="absolute top-2 left-2 w-5 h-5 accent-[#ff2c2c]"
              />
              <div className="pl-7">
                <div className="font-semibold text-lg">{product.name}</div>
                <div className="text-[#ff2c2c] font-bold">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="w-1/5">
        {/* Sidebar or secondary content goes here */}
      </aside>
    </div>
  )
}

export default Home
