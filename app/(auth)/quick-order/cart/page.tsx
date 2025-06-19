'use client';

import React from 'react';
import { useCart } from '@/app/(auth)/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Assuming you might want to display images

// Interface for CartItem, should match the one in cart-context.tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | string[]; // Optional: if your context's CartItem includes image
}

export default function QuickOrderCartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      router.push('/quick-order'); // Redirect to add items
    } else {
      router.push('/quick-order/checkout'); // Navigate to the new checkout page
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/quick-order')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Quick Order
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Quick Order Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => router.push('/quick-order')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-150"
            >
              Add Items
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="space-y-6 mb-8">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center mb-4 sm:mb-0">
                    {item.image && (
                      <Image
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        width={64} // 4rem
                        height={64} // 4rem
                        className="rounded-md object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-800 w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-semibold text-gray-800">Total:</p>
                <p className="text-2xl font-bold text-gray-900">${calculateTotal().toFixed(2)}</p>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
