'use client'
import React, { useState, useEffect } from 'react'
import Product from '@/components/ProductPage';
import Image from 'next/image';

const categories = [
  "all", "donuts", "burgers", "ice", "poteto", "pizza", "fries", "cake", "chicken", "hot dog"
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Cart state for invoice
  const [cart, setCart] = useState<any[]>([]);

  // Pagination state for products
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(0);

  // Add to cart handler
  const handleAddToCart = (product: any) => {
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Add one more of an item in the cart (for use in the cart UI)
  const handleAddOne = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  // Pagination controls
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = (totalPages: number) => setPage((prev) => Math.min(prev + 1, totalPages - 1));

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full relative">
      <section className="w-4/5 p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Explore Categories</h2>
        {/* Categories List */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full capitalize border ${
                selectedCategory === cat
                  ? "bg-[#ff2c2c] text-white border-[#ff2c2c]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Products List */}
        <Product
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
          page={page}
          itemsPerPage={ITEMS_PER_PAGE}
        />
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <ProductPaginationInfo
            selectedCategory={selectedCategory}
            itemsPerPage={ITEMS_PER_PAGE}
            page={page}
          />
          <button
            onClick={() => {
              // Calculate total pages based on filtered products
              const totalProducts = window.__PRODUCTS_TOTAL__ || 0;
              const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
              handleNext(totalPages);
            }}
            disabled={
              (() => {
                const totalProducts = window.__PRODUCTS_TOTAL__ || 0;
                const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
                return page >= totalPages - 1;
              })()
            }
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
      <div
        className="w-1/5 invoice pr-2 flex sticky top-18 h-fit overflow-hidden"
        style={{ minWidth: 320, maxWidth: 400 }}
      >
        <div className=" bg-white rounded-xl border border-r-2 border-gray-950 p-4 flex flex-col items-center mt-1 w-full">
          <h2 className="text-2xl font-bold mb-4">Invoice</h2>
          <div className="w-full flex flex-col gap-2 mb-4">
            {cart.length === 0 && <div className="text-gray-400 text-center">No items in cart</div>}
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center justify-between w-full border-b pb-2 last:border-b-0 gap-2">
                <Image
                  src={typeof item.product.image === 'string' ? item.product.image : item.product.image[0]}
                  alt={item.product.name}
                  className="h-10 w-10 object-contain rounded"
                  width={40}
                  height={40}
                />
                <span className="font-semibold">{item.quantity}x</span>
                <span className="font-bold text-right">${(item.product.price * item.quantity).toFixed(2)}</span>
                {/* Add button */}
                <button
                  className="bg-[#ff2c2c] text-white px-2 py-1 rounded hover:bg-[#e01b1b] transition text-xs"
                  onClick={() => handleAddOne(item.product.id)}
                  title="Add one more"
                >
                  Add
                </button>
                <div className="relative group">
                  <button className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs focus:outline-none">
                    &#8942;
                  </button>
                  <div className="absolute right-0 top-6 z-20 hidden group-focus-within:block group-hover:block bg-white border border-gray-200 rounded shadow-lg min-w-[100px]">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        const newAmount = prompt('Enter new quantity:', item.quantity.toString());
                        const qty = Number(newAmount);
                        if (!isNaN(qty) && qty > 0) {
                          setCart(cart.map(i => i.product.id === item.product.id ? { ...i, quantity: qty } : i));
                        }
                      }}
                    >
                      Edit Quantity
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => setCart(cart.filter(i => i.product.id !== item.product.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between mb-2 text-sm">
            <span className="text-gray-700 ">Total Items:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="w-full flex justify-between mb-4 text-sm ">
            <span className="text-gray-700">Total Cost:</span>
            <span className="font-semibold">${totalCost.toFixed(2)}</span>
          </div>
          <button className="w-full bg-[#f72121] text-white font-bold text-sm py-2 rounded-lg hover:bg-[#d81b1b] transition">
            Checkout
          </button>
        </div>
      </div>
      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#ff2c2c] text-white rounded-full p-3 shadow-lg hover:bg-[#e01b1b] transition z-50"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Helper component to show page info (must be placed in the same file)
function ProductPaginationInfo({ selectedCategory, itemsPerPage, page }: { selectedCategory: string, itemsPerPage: number, page: number }) {
  // This assumes you have access to the products array here, or you can pass the total count as a prop.
  // For this example, we use a global variable set by the Product component.
  const totalProducts = typeof window !== "undefined" ? (window.__PRODUCTS_TOTAL__ || 0) : 0;
  const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));
  return (
    <span>
      Page {page + 1} of {totalPages}
    </span>
  );
}

export default Home
