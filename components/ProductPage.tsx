import React from "react";
import { products } from "../public/assets/assets";
import Image from "next/image";

interface ProductPageProps {
  selectedCategory: string;
  onAddToCart: (product: any) => void;
  page: number;
  itemsPerPage: number;
}

const ProductPage: React.FC<ProductPageProps> = ({
  selectedCategory,
  onAddToCart,
  page,
  itemsPerPage,
}) => {
  const filteredProducts = products.filter(
    (product: any) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  // Set global for pagination info in parent
  if (typeof window !== "undefined") {
    window.__PRODUCTS_TOTAL__ = filteredProducts.length;
  }

  const paginatedProducts = filteredProducts.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-wrap gap-6">
      {paginatedProducts.map((product: any) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center w-64 mb-4"
        >
          <Image
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded mb-2"
            width={96}
            height={96}
          />
          <div className="font-semibold text-lg text-center mb-2">
            {product.name}
          </div>
          <div className="text-[#ff2c2c] font-bold mb-2">
            ${product.price}
          </div>
          <button
            className="bg-[#ff2c2c] text-white px-4 py-1 rounded hover:bg-[#e01b1b] transition"
            onClick={() => onAddToCart(product)}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
