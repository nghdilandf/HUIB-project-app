"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaUtensils, FaCommentDots, FaEnvelope, FaHistory, FaChartBar, FaTools } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, to: "/" },
  { name: "Food Order", icon: <FaUtensils />, to: "/food-order" },
  { name: "Feedback", icon: <FaCommentDots />, to: "/feedback" },
  { name: "Messages", icon: <FaEnvelope />, to: "/messages" },
  { name: "Payment History", icon: <FaHistory />, to: "/payment-history" },
  { name: "Analysis", icon: <FaChartBar />, to: "/analysis" },
  { name: "Costomization", icon: <FaTools />, to: "/costomization" },
];

const LeftSideHeader = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] p-4 bg-gray-50 fixed top-[70px] left-0 h-full">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);

            return (
              <li key={item.name}>
                <Link
                  href={item.to}
                  className={`flex items-center hover:border-1 hover:border-[#ff2c2c] w-full px-2 py-2 rounded transition-colors
                    ${isActive
                      ? "bg-[#ff2c2c34] text-gray-800 border-1 border-[#ff2c2c]"
                      : "bg-[#fff] shadow-md shadow-gray-300 hover:bg-[#ff2c2c] hover:text-gray-50"}
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSideHeader;
