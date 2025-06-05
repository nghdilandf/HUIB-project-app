import React from "react";

const Footer = () => (
  <footer className="w-full bg-gray-900 text-gray-200 pt-12 pb-6 mt-12">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-10 md:gap-20 justify-between">
          {/* About */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center mb-4">
              <span className="font-bold text-2xl text-[#ff2c2c] mr-2">🇨🇲 CAMEROON FLAVORS</span>
            </div>
            <p className="text-gray-400 mb-4">Cameroon Flavors is your go-to platform for discovering and ordering the best traditional meals from all ten regions of Cameroon. Fast delivery, authentic taste, and a celebration of our culinary heritage!</p>
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
              <li><a href="/auth/quick-order" className="hover:text-[#ff2c2c]">Quick Order</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-bold text-lg mb-3 text-white">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: <a href="mailto:support@cameroonflavors.com" className="hover:text-[#ff2c2c]">support@cameroonflavors.com</a></li>
              <li>Phone: <a href="tel:+237650000000" className="hover:text-[#ff2c2c]">+237 650 000 000</a></li>
              <li>Address: Yaoundé, Cameroon</li>
            </ul>
          </div>
        </div>
        <div className="w-4/5 mx-auto border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Foodie Resto. All rights reserved.
        </div>
      </footer>
);

export default Footer;
