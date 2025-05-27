import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/homepage", key: "home" },
  { name: "Menu", href: "/menu", key: "menu" },
  { name: "About", href: "/homepage#about", key: "about" },
  { name: "Contact", href: "/homepage#contact", key: "contact" },
];

interface UserHeaderProps {
  cartCount?: number;
  activePage?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ cartCount = 0, activePage }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Section 1: Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/homepage")}> 
          <Image src="/assets/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
          <span className="font-bold text-xl text-[#ff2c2c] hidden sm:inline">Foodie Resto</span>
        </div>
        {/* Section 2: Menu (Desktop) */}
        <nav className="hidden md:flex gap-8 text-base font-medium">
          {menuItems.map(item => (
            <a key={item.name} href={item.href} className={`hover:text-[#ff2c2c] transition-colors ${activePage === item.key ? 'text-[#ff2c2c] font-bold underline underline-offset-4' : ''}`}>{item.name}</a>
          ))}
        </nav>
        {/* Section 3: Icons */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button onClick={() => setShowSearch(v => !v)} className="relative p-2 rounded hover:bg-gray-100">
            <Image src="/assets/search_icon.png" alt="Search" width={22} height={22} />
          </button>
          {/* Profile Icon */}
          <div className="relative">
            <button onClick={() => setShowProfile(v => !v)} className="p-2 rounded hover:bg-gray-100">
              <Image src="/assets/profile_icon.png" alt="Profile" width={24} height={24} />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-40 flex flex-col">
                <button className="px-4 py-2 text-left hover:bg-gray-100" onClick={() => router.push("/profile")}>View Profile</button>
                <button className="px-4 py-2 text-left hover:bg-gray-100 text-red-500" onClick={() => {/* handle logout */}}>Logout</button>
              </div>
            )}
          </div>
          {/* Cart Icon */}
          <div className="relative">
            <button onClick={() => router.push("/cart")} className="p-2 rounded hover:bg-gray-100">
              <Image src="/assets/cart_icon.png" alt="Cart" width={24} height={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff2c2c] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{cartCount}</span>
              )}
            </button>
          </div>
          {/* Hamburger for Mobile */}
          <button className="md:hidden ml-2 p-2 rounded hover:bg-gray-100" onClick={() => setShowMobileMenu(v => !v)}>
            <Image src="/assets/menu_icon.png" alt="Menu" width={28} height={28} />
          </button>
        </div>
      </div>
      {/* Searchbar Popup */}
      {showSearch && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md z-40 flex justify-center py-4 animate-fade-in">
          <input
            type="text"
            placeholder="Search for food, cuisines, etc..."
            className="w-3/4 md:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff2c2c]"
            autoFocus
          />
        </div>
      )}
      {/* Mobile Menu Popup */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex flex-col">
          <div className="bg-white w-4/5 max-w-xs h-full p-6 flex flex-col gap-6 animate-slide-in-left">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => {router.push("/homepage"); setShowMobileMenu(false);}}>
              <Image src="/assets/logo.png" alt="Logo" width={36} height={36} />
              <span className="font-bold text-lg text-[#ff2c2c]">Foodie</span>
            </div>
            <nav className="flex flex-col gap-4">
              {menuItems.map(item => (
                <a key={item.name} href={item.href} className="py-2 px-2 rounded hover:bg-gray-100 text-base font-medium" onClick={() => setShowMobileMenu(false)}>{item.name}</a>
              ))}
            </nav>
            <div className="flex gap-4 mt-6">
              {/* Search Icon */}
              <button onClick={() => {setShowSearch(true); setShowMobileMenu(false);}} className="p-2 rounded hover:bg-gray-100">
                <Image src="/assets/search_icon.png" alt="Search" width={22} height={22} />
              </button>
              {/* Profile Icon */}
              <button onClick={() => {setShowProfile(true); setShowMobileMenu(false);}} className="p-2 rounded hover:bg-gray-100">
                <Image src="/assets/profile_icon.png" alt="Profile" width={24} height={24} />
              </button>
              {/* Cart Icon */}
              <button onClick={() => {router.push("/cart"); setShowMobileMenu(false);}} className="relative p-2 rounded hover:bg-gray-100">
                <Image src="/assets/cart_icon.png" alt="Cart" width={24} height={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff2c2c] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMobileMenu(false)} />
        </div>
      )}
    </header>
  );
};

export default UserHeader;
