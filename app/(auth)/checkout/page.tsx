"use client"
import React, { useState, useEffect } from "react";
import UserHeader from "@/components/UserHeader";
import Image from "next/image";

// Utility to get cart from localStorage
function getCartItems() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    if (stored) return JSON.parse(stored);
  }
  return [];
}

const paymentOptions = [
  { key: "orange", label: "Orange Money", logo: "/assets/razorpay_logo.png" },
  { key: "mtn", label: "MTN Mobile Money", logo: "/assets/stripe_logo.png" },
  { key: "cash", label: "Cash on Delivery", logo: "/assets/cash_icon.png" },
];

// Define cart item type for type safety
interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string[] | string;
  };
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("orange");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send order to backend
    setOrderPlaced(true);
    localStorage.removeItem("cart");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        <div className="w-full max-w-xl mx-auto py-20 flex flex-col items-center">
          <Image src="/assets/quality_icon.png" alt="Order Placed" width={80} height={80} />
          <h2 className="text-2xl font-bold text-[#ff2c2c] mt-6 mb-2">Order Placed!</h2>
          <p className="text-gray-700 text-center mb-6">Thank you for your order. We&apos;ll contact you soon to confirm your delivery.</p>
          <a href="/homepage" className="px-6 py-2 bg-[#ff2c2c] text-white rounded-lg font-bold hover:bg-[#e01b1b] transition">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader activePage="cart" />
      <section className="w-full max-w-6xl mx-auto py-8 px-2 sm:px-4">
        <h2 className="text-3xl font-bold text-[#000000] mb-8">Checkout</h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Summary */}
          <div className="lg:w-[60%] w-full bg-white rounded-xl shadow p-4 sm:p-6 mb-8 lg:mb-0 min-w-0">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-8">Your cart is empty.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item: CartItem) => (
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
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total:</span>
                  <span className="text-[#ff2c2c]">{totalCost.toLocaleString()} FCFA</span>
                </div>
              </div>
            )}
          </div>
          {/* Checkout Form */}
          <form className="lg:w-[40%] w-full bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col gap-6 min-w-0" onSubmit={handlePlaceOrder}>
            <h3 className="font-bold text-lg mb-2">Delivery Details</h3>
            <input
              type="text"
              placeholder="Delivery Address"
              className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <textarea
              placeholder="Order Note (optional)"
              className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c] min-h-[60px]"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <div>
              <h4 className="font-semibold mb-2">Payment Method</h4>
              <div className="flex flex-col gap-3">
                {paymentOptions.map(opt => (
                  <label key={opt.key} className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition ${selectedPayment === opt.key ? 'border-[#ff2c2c] bg-[#fff6f6]' : 'border-gray-200 bg-white'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.key}
                      checked={selectedPayment === opt.key}
                      onChange={() => setSelectedPayment(opt.key)}
                      className="accent-[#ff2c2c]"
                    />
                    <Image src={opt.logo} alt={opt.label} width={32} height={32} />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">* Only Orange Money, MTN Mobile Money, and Cash on Delivery are accepted.</div>
            </div>
            <button
              type="submit"
              className="bg-[#ff2c2c] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#e01b1b] transition mt-2"
              disabled={cart.length === 0}
            >
              {selectedPayment === 'cash' ? 'Place Order' : 'Proceed'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
