'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/(auth)/cart-context';
import { useRouter } from 'next/navigation';

// Interface for CartItem, should match the one in cart-context.tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | string[]; // Optional: if you use images in your cart context
}

export default function QuickOrderCheckoutPage() {
  const { cartItems, removeFromCart } = useCart(); // Assuming removeFromCart might be used to clear cart post-checkout
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const calculateSubtotal = (item: CartItem) => item.price * item.quantity;
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to your order.');
      router.push('/quick-order'); 
      return;
    }
    if (!fullName || !paymentAccount || !tableNumber) {
      alert('Please fill in all required fields: Full Name, Payment Account, and Table Number.');
      return;
    }

    console.log('Order Submitted (Quick Order):', {
      customerName: fullName,
      paymentDetails: paymentAccount,
      table: tableNumber,
      items: cartItems,
      totalAmount: calculateTotal(),
    });

    alert('Quick Order placed successfully! (Details in console).');
    // Consider adding a clearCart function to your context and calling it here
    // e.g., clearCart(); 
    // For now, let's manually clear by removing each item if needed, or just redirect
    // cartItems.forEach(item => removeFromCart(item.id)); // Example: Clears cart
    router.push('/quick-order'); // Redirect to quick order page or a thank you page
  };

  useEffect(() => {
    if (cartItems.length === 0 && typeof window !== 'undefined') {
      alert('Your cart is empty. Redirecting to Quick Order page.');
      router.replace('/quick-order');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <p className="text-xl text-gray-700 mb-4">Your cart is currently empty for checkout.</p>
        <button 
          onClick={() => router.push('/quick-order')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Return to Quick Order
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Quick Order Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Left Side: Cart Items Summary */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4">Your Order Summary</h2>
            <div className="space-y-5 mb-6 max-h-[60vh] overflow-y-auto pr-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b border-gray-200 pb-4 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold text-gray-800 text-lg whitespace-nowrap">${calculateSubtotal(item).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-5 mt-5">
              <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Side: User Details and Payment */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4">Delivery & Payment Details</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-150 ease-in-out"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label htmlFor="paymentAccount" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Account (e.g., Mobile Money #)
                </label>
                <input
                  type="text"
                  id="paymentAccount"
                  name="paymentAccount"
                  value={paymentAccount}
                  onChange={(e) => setPaymentAccount(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-150 ease-in-out"
                  placeholder="e.g., 0123456789"
                />
              </div>

              <div>
                <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  id="tableNumber"
                  name="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-150 ease-in-out"
                  placeholder="e.g., Table 5 / T05"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-105"
              >
                Place Order & Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
