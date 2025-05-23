"use client"
import React, { useState } from 'react'
import TopHeader from '@/components/TopHeader';
import Image from 'next/image';
import { products } from '../../../public/assets/assets';

const categories = [
  'all', 'donuts', 'burgers', 'ice', 'poteto', 'pizza', 'fries', 'cake', 'chicken', 'hot dog'
];

const ClientHome = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const [loved, setLoved] = useState<{ [id: string]: boolean }>({});
  const [cart, setCart] = useState<any[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Filter and paginate products
  const filteredProducts = products.filter(
    (product: any) => selectedCategory === 'all' || product.category?.toLowerCase() === selectedCategory
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  // Handlers
  const handleLove = (id: string) => {
    setLoved(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handleAdd = (product: any) => {
    setCart(prev => {
      const found = prev.find(item => item.product._id === product._id);
      if (found) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setShowCartPopup(true);
  };
  const handleCloseCartPopup = () => setShowCartPopup(false);

  // Cart totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader cartCount={totalItems} />
      {/* Hero Section */}
      <section className="w-4/5 mx-auto bg-[#fff6f6] py-12 flex flex-col md:flex-row items-center justify-center mb-8 gap-8 md:gap-16">
        <div className="flex-1 flex flex-col items-start md:items-start justify-center max-w-xl px-4">
          <h1 className="text-4xl font-extrabold text-[#ff2c2c] mb-2">Welcome to Foodie</h1>
          <p className="text-lg text-gray-700 mb-4 text-left max-w-2xl">
            Discover and order your favorite meals, snacks, and drinks from the best local restaurants. Fast delivery, great taste, and a world of options!
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/assets/hero_img.png" alt="Hero" width={320} height={180} className="rounded-xl shadow-lg" />
        </div>
      </section>
      {/* Categories */}
      <div className="w-4/5 mx-auto flex flex-wrap gap-2 justify-center mb-8">
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
      {/* Product Grid */}
      <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center px-4">
        {paginatedProducts.map((product: any) => (
          <div key={product._id} className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center w-64 mb-4 shadow-sm">
            <Image
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded mb-2"
              width={96}
              height={96}
            />
            <div className="font-semibold text-lg text-center mb-2">{product.name}</div>
            <div className="flex w-full justify-between items-center mt-2">
              <button
                className={`text-2xl ${loved[product._id] ? 'text-[#ff2c2c]' : 'text-gray-400'} transition`}
                onClick={() => handleLove(product._id)}
                aria-label="Love"
              >
                ♥
              </button>
              <button
                className="bg-[#ff2c2c] text-white px-4 py-1 rounded hover:bg-[#e01b1b] transition font-semibold"
                onClick={() => handleAdd(product)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="w-4/5 mx-auto flex justify-center items-center gap-4 mt-8 mb-12">
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
                    <div className="font-bold text-[#ff2c2c]">${(item.product.price * item.quantity).toFixed(2)}</div>
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
              <span className="text-[#ff2c2c]">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <a href="/cart" className="flex-1 bg-gray-200 text-gray-700 rounded px-4 py-2 text-center font-semibold hover:bg-gray-300 transition">View Cart</a>
              <button className="flex-1 bg-[#ff2c2c] text-white rounded px-4 py-2 font-semibold hover:bg-[#e01b1b] transition">Checkout</button>
            </div>
          </div>
        </div>
      )}
      {/* Newsletter Section */}
      <section className="w-full bg-[#fff6f6] py-10 mt-16 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-[#ff2c2c] mb-2">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 mb-4 text-center max-w-md">Get the latest updates, exclusive offers, and delicious deals delivered straight to your inbox!</p>
        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[#ff2c2c]"
          />
          <button
            type="submit"
            className="bg-[#ff2c2c] text-white px-6 py-2 rounded font-semibold hover:bg-[#e01b1b] transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-gray-200 pt-12 pb-6 mt-12">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-10 md:gap-20 justify-between">
          {/* About */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center mb-4">
              <span className="font-bold text-2xl text-[#ff2c2c] mr-2">🍽️ RESTO</span>
            </div>
            <p className="text-gray-400 mb-4">Foodie is your go-to platform for discovering and ordering the best local meals, snacks, and drinks. Fast delivery, great taste, and a world of options!</p>
            <div className="flex gap-3 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-[#ff2c2c]">Fb</a>
              <a href="#" aria-label="Instagram" className="hover:text-[#ff2c2c]">Ig</a>
              <a href="#" aria-label="Twitter" className="hover:text-[#ff2c2c]">Tw</a>
            </div>
          </div>
          {/* Links */}
          <div className="flex-1 min-w-[150px]">
            <h4 className="font-bold text-lg mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/homepage" className="hover:text-[#ff2c2c]">Home</a></li>
              <li><a href="/auth/cart" className="hover:text-[#ff2c2c]">Cart</a></li>
              <li><a href="/auth/login" className="hover:text-[#ff2c2c]">Login</a></li>
              <li><a href="/auth/signin" className="hover:text-[#ff2c2c]">Sign Up</a></li>
              <li><a href="/auth/quick-order" className="hover:text-[#ff2c2c]">Quick Order</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-bold text-lg mb-3 text-white">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: <a href="mailto:support@foodie.com" className="hover:text-[#ff2c2c]">support@foodie.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-[#ff2c2c]">+1 234 567 890</a></li>
              <li>Address: 123 Foodie Lane, Flavor Town, USA</li>
            </ul>
          </div>
        </div>
        <div className="w-4/5 mx-auto border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ClientHome
