"use client"
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import Image from "next/image";
import cartIcon from "../public/assets/cart_icon.svg";
import Link from "next/link";

interface TopHeaderProps {
  cartCount?: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ cartCount = 0 }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleViewProfile = () => {
    // Add your view profile logic here (e.g., navigate to profile page)
    alert("View Profile clicked");
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = '/login';
    setProfileOpen(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <header className="w-full h-[70px] fixed top-0 left-0 bg-gray-50 px-4 flex items-center z-50">
      {/* Left: Logo and Name */}
      <div className="flex items-center flex-1">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
          {/* Placeholder for logo */}
          <span className="font-bold text-lg">🍽️</span>
        </div>
        <span className="font-bold text-xl tracking-wide">FOODIE RESTO</span>
      </div>
      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none"
        />
        <button className="px-4 py-2 bg-[#ff2c2c] text-white rounded-r-md hover:bg-[#ff2c2c]">
          Search
        </button>
      </div>
      {/* Right: Profile, Notification, Settings */}
      <div className="flex items-center justify-end flex-1 space-x-4">
        <button className="text-gray-700 hover:bg-[#ff2c2c34] w-[30px] h-[30px] flex items-center justify-center rounded">
          <FaBell size={22} />
        </button>
        <div className="relative" ref={profileRef}>
          <button
            className="text-gray-700 gap-1 p-2 bg-gray-200 h-[30px] flex items-center rounded justify-between"
            onClick={() => setProfileOpen((open) => !open)}
          >
            <FaUserCircle size={24} />
            <div className="text-sm">Ngah Diland</div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleViewProfile}
                tabIndex={0}
              >
                View Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
                tabIndex={0}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <Link href="/cart" className="relative text-gray-700 hover:bg-[#ff2c2c34] w-[36px] h-[36px] flex items-center justify-center rounded">
          <Image src={cartIcon} alt="Cart" width={24} height={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ff2c2c] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default TopHeader;
