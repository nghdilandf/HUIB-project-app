"use client"
import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import Image from 'next/image';
import { products } from '../../../public/assets/assets';

type CartItem = {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string | string[];
    // add other product fields as needed
  };
  quantity: number;
};

// Utility function to get cart items (for demo, replace with context or persistent state in real app)
function getCartItems(): CartItem[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart');
    if (stored) return JSON.parse(stored);
  }
  return [];
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // On mount, sync cart state with localStorage (to match popup)
  React.useEffect(() => {
    setCart(getCartItems());
  }, []);

  // Sync cart state with localStorage on change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  // Handlers
  const handleAddOne = (productId: string) => {
    setCart(prev => prev.map(item =>
      item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  const handleRemoveOne = (productId: string) => {
    setCart(prev => prev.map(item =>
      item.product._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };
  const handleDelete = (productId: string) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <section className="w-4/5 mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#ff2c2c]">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center text-center text-gray-400 text-lg py-16">
            <span>Your cart is empty.</span>
            <button
              className="mt-8 px-6 py-3 bg-[#ff2c2c] text-white rounded-lg font-bold text-lg hover:bg-[#e01b1b] transition"
              onClick={() => window.location.href = '/homepage'}
            >
              Place Order
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 flex flex-col gap-6">
              {cart.map(item => (
                <div key={item.product._id} className="flex items-center bg-white rounded-lg shadow p-4 gap-6">
                  <Image
                    src={Array.isArray(item.product.image) ? item.product.image[0] : item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded object-cover w-20 h-20"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{item.product.name}</div>
                    <div className="text-[#ff2c2c] font-bold mb-2">${item.product.price}</div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handleRemoveOne(item.product._id)}>-</button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handleAddOne(item.product._id)}>+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                    <button className="text-red-500 hover:underline text-sm" onClick={() => handleDelete(item.product._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {/* Sticky Summary/Checkout */}
            <div className="md:w-1/3 w-full md:sticky md:top-28 h-fit bg-white rounded-lg shadow p-6 flex flex-col gap-6 self-start">
              <div className="text-lg font-semibold">Total Items: {totalItems}</div>
              <div className="text-2xl font-bold text-[#ff2c2c]">Total: ${totalCost.toFixed(2)}</div>
              <button className="bg-[#ff2c2c] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#e01b1b] transition">Checkout</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
