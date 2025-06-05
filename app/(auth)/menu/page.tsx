"use client"
import React, { useState } from "react";
import UserHeader from "@/components/UserHeader";
import Image from "next/image";
import { products } from "../../../public/assets/assets";
import Footer from "@/components/Footer";

const categories = [
  "all",
  "Adamawa",
  "Centre",
  "East",
  "Far North",
  "Littoral",
  "North",
  "Northwest",
  "West",
  "South",
  "Southwest"
];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const [cart, setCart] = useState<any[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [search, setSearch] = useState("");

  // Filter and paginate products
  const filteredProducts = products.filter(
    (product: any) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (search === "" || product.name.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  // Handlers
  const handleAdd = (product: any) => {
    setCart(prev => {
      const found = prev.find(item => item.product._id === product._id);
      let updatedCart;
      if (found) {
        updatedCart = prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { product, quantity: 1 }];
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
    setShowCartPopup(true);
  };
  const handleCloseCartPopup = () => setShowCartPopup(false);

  // Cart totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader activePage="menu" cartCount={totalItems} />
      <section className="w-4/5 mx-auto py-10">
        <h1 className="text-3xl font-bold text-[#000000] mb-6">Menu</h1>
        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <input
            type="text"
            placeholder="Search for food, cuisines, etc..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff2c2c]"
          />
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-1 rounded-full capitalize border transition font-semibold ${selectedCategory === cat ? 'bg-[#ff2c2c] text-white border-[#ff2c2c]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => { setSelectedCategory(cat); setPage(0); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center px-4">
          {paginatedProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No items found.</div>
          ) : (
            paginatedProducts.map((product: any) => (
              <div key={product._id} className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center w-64 mb-4 shadow-sm">
                <Image
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded mb-2"
                  width={96}
                  height={96}
                />
                <div className="font-semibold text-lg text-center mb-2">{product.name}</div>
                <div className="text-[#ff2c2c] font-bold text-lg mb-3">{product.price.toLocaleString()} FCFA</div>
                <div className="flex w-full justify-between items-center mt-2">
                  <button
                    className={`text-2xl ${cart.find((item) => item.product._id === product._id) ? 'text-[#ff2c2c]' : 'text-gray-400'} transition`}
                    onClick={() => {/* handle love logic here, e.g., toggle loved state */}}
                    aria-label="Love"
                  >
                    ♥
                  </button>
                  <button
                    className="bg-[#ff2c2c] text-white px-4 py-1 rounded hover:bg-[#e01b1b] transition font-semibold"
                    onClick={() => handleAdd(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8 mb-12">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {/* Cart Popup */}
        {showCartPopup && (
          <div className="fixed top-0 right-0 h-full w-full md:w-[320px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slide-in">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-[#ff2c2c]">Cart</h3>
              <button onClick={handleCloseCartPopup} className="text-gray-500 text-2xl font-bold">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-12">No items in cart.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map(item => (
                    <div key={item.product._id} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                      <Image
                        src={Array.isArray(item.product.image) ? item.product.image[0] : item.product.image}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="rounded object-cover w-12 h-12"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{item.product.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-[#ff2c2c]">{(item.product.price * item.quantity).toLocaleString()} FCFA</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Total Items:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#ff2c2c]">{totalCost.toLocaleString()} FCFA</span>
              </div>
              <div className="flex gap-2 mt-4">
                <a href="/cart" className="flex-1 bg-gray-200 text-gray-700 rounded px-4 py-2 text-center font-semibold hover:bg-gray-300 transition">View Cart</a>
                <a href="/checkout" className="flex-1 bg-[#ff2c2c] text-white rounded px-4 py-2 font-semibold hover:bg-[#e01b1b] transition text-center">Checkout</a>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default MenuPage;
