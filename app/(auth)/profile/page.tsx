"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import UserHeader from "@/components/UserHeader";

const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  phone: "+1 234 567 890",
  address: "123 Foodie Lane, Flavor Town, USA",
  avatar: "/assets/profile.jpg",
  joined: "March 2023",
};

// Helper to get user data from localStorage
function getUserFromStorage() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('userData');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(mockUser);
  // On mount, update user from localStorage if available
  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) setUser(stored);
  }, []);
  const [form, setForm] = useState(user);
  const [uploading, setUploading] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update user state if localStorage changes (e.g., after login)
  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) setUser(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile photo change
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // For demo: use a local URL. In production, upload to server/cloud.
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev: any) => ({ ...prev, avatar: reader.result }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Save profile changes and update backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
    setEditMode(false);
    localStorage.setItem('userData', JSON.stringify(form));
    // Update user in backend JSON file
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {}
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader activePage="profile" />
      <section className="w-full max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-10">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center gap-6 md:w-1/2">
          <div className="relative">
            {user.avatar ? (
              <Image src={user.avatar} alt="Profile" width={100} height={100} className="rounded-full object-cover w-24 h-24 border-4 border-[#ff2c2c]" />
            ) : (
              <div className="rounded-full object-cover w-24 h-24 border-4 border-[#ff2c2c] bg-gray-200 flex items-center justify-center text-3xl text-gray-400">
                <span>?</span>
              </div>
            )}
            <span className="absolute bottom-0 right-0 bg-[#ff2c2c] text-white text-xs px-2 py-0.5 rounded-full">{editMode ? "Edit" : "User"}</span>
          </div>
          {!editMode ? (
            <>
              <h2 className="text-2xl font-bold text-[#ff2c2c]">{user.name}</h2>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-gray-600">{user.phone}</div>
              <div className="text-gray-600 text-center">{user.address}</div>
              <div className="text-gray-400 text-sm">Joined: {user.joined}</div>
              <button className="mt-4 px-6 py-2 bg-[#ff2c2c] text-white rounded-lg font-bold hover:bg-[#e01b1b] transition" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <form className="w-full flex flex-col gap-4" onSubmit={handleSave}>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
                <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Image src={form.avatar || "/assets/profile.jpg"} alt="Profile" width={100} height={100} className="rounded-full object-cover w-24 h-24 border-4 border-[#ff2c2c]" />
                  <span className="absolute bottom-0 right-0 bg-[#ff2c2c] text-white text-xs px-2 py-0.5 rounded-full">Change</span>
                </div>
                {uploading && <div className="text-xs text-gray-500">Uploading...</div>}
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
                placeholder="Password"
                required
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
                placeholder="Phone"
                required
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-[#ff2c2c]"
                placeholder="Address"
                required
              />
              <div className="flex gap-4 mt-2">
                <button type="submit" className="flex-1 bg-[#ff2c2c] text-white px-4 py-2 rounded font-bold hover:bg-[#e01b1b] transition">Save</button>
                <button type="button" className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded font-bold hover:bg-gray-300 transition" onClick={() => { setEditMode(false); setForm(user); }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        {/* Profile Features */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#ff2c2c] mb-2">Order History</h3>
            <p className="text-gray-600 text-sm">View your recent orders, reorder favorites, and track your deliveries.</p>
            <button className="mt-2 px-4 py-2 bg-[#ff2c2c] text-white rounded font-semibold hover:bg-[#e01b1b] transition">View Orders</button>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#ff2c2c] mb-2">Saved Addresses</h3>
            <p className="text-gray-600 text-sm">Manage your delivery addresses for faster checkout.</p>
            <button className="mt-2 px-4 py-2 bg-[#ff2c2c] text-white rounded font-semibold hover:bg-[#e01b1b] transition">Manage Addresses</button>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#ff2c2c] mb-2">Payment Methods</h3>
            <p className="text-gray-600 text-sm">Add or update your cards and payment options securely.</p>
            <button className="mt-2 px-4 py-2 bg-[#ff2c2c] text-white rounded font-semibold hover:bg-[#e01b1b] transition">Manage Payments</button>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#ff2c2c] mb-2">Account Settings</h3>
            <p className="text-gray-600 text-sm">Change your password, notification preferences, and more.</p>
            <button className="mt-2 px-4 py-2 bg-[#ff2c2c] text-white rounded font-semibold hover:bg-[#e01b1b] transition">Account Settings</button>
          </div>
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-6">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition" onClick={() => setShowLogoutPopup(true)}>Logout</button>
          </div>
        </div>
      </section>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 min-w-[300px]">
            <h3 className="text-xl font-bold text-[#ff2c2c] mb-2">Confirm Logout</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button className="bg-[#ff2c2c] text-white px-6 py-2 rounded font-bold hover:bg-[#e01b1b] transition" onClick={handleLogout}>Yes</button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-bold hover:bg-gray-300 transition" onClick={() => setShowLogoutPopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
