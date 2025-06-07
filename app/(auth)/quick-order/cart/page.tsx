"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../page";

interface QuickOrderCartItem {
  product: Product;
  quantity: number;
}

const QuickOrderCart = () => {
  const [cart, setCart] = useState<QuickOrderCartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quickOrderCart");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quickOrderCart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(item => item.product._id !== id));
  };

  const handleQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item =>
      item.product._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="w-4/5 mx-auto flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-[#ff2c2c]">Quick Order Cart</h1>
        <Link href="/quick-order/checkout" className={`bg-[#ff2c2c] text-white px-6 py-2 rounded font-bold text-lg shadow hover:bg-[#e01b1b] transition ${cart.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>Checkout</Link>
      </div>
      {cart.length === 0 ? (
        <div className="w-4/5 mx-auto text-center text-gray-500 mt-16 text-xl">Your cart is empty.</div>
      ) : (
        <div className="w-4/5 mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex flex-col gap-6">
            {cart.map(item => (
              <div key={item.product._id} className="flex items-center gap-6 border-b pb-4 last:border-b-0">
                <Image src={item.product.image[0]} alt={item.product.name} width={64} height={64} className="rounded object-cover w-16 h-16" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.product.name}</div>
                  <div className="text-gray-500 text-sm">{item.product.price.toLocaleString()} FCFA</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQuantity(item.product._id, -1)} className="px-2 py-1 bg-gray-200 rounded text-lg font-bold">-</button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.product._id, 1)} className="px-2 py-1 bg-gray-200 rounded text-lg font-bold">+</button>
                </div>
                <div className="font-bold text-[#ff2c2c] text-lg">{(item.product.price * item.quantity).toLocaleString()} FCFA</div>
                <button onClick={() => handleRemove(item.product._id)} className="text-red-500 hover:underline text-sm ml-4">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <div className="text-xl font-bold">Total: <span className="text-[#ff2c2c]">{totalCost.toLocaleString()} FCFA</span></div>
          </div>
        </div>
      )}
      <div className="w-4/5 mx-auto mt-8">
        <Link href="/quick-order" className="text-[#ff2c2c] underline font-semibold">&larr; Continue Shopping</Link>
      </div>
    </div>
  );
};

export default QuickOrderCart;
