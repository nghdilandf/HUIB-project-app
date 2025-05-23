'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { products } from '../../public/assets/assets';

const Home = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Pagination state for products
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(0);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  // Remove category state and UI
  // Add dashboard edit options
  const dashboardOptions = [
    { label: 'Manage Products', action: () => {} },
    { label: 'Manage Orders', action: () => {} },
    { label: 'Manage Users', action: () => {} },
    { label: 'Site Settings', action: () => {} },
    { label: 'View Analytics', action: () => {} },
  ];

  // Product editing state
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', image: '' });

  // Edit product handlers
  const handleEditClick = (product: typeof products[0]) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      image: typeof product.image[0] === 'string' ? product.image[0] : '',
    });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    if (editingProduct) {
      editingProduct.name = editForm.name;
      editingProduct.price = Number(editForm.price);
      // Accept string or StaticImageData for demo; real app should validate and upload
      editingProduct.image = [editForm.image as unknown as typeof editingProduct.image[0]];
    }
    setEditingProduct(null);
  };
  const handleEditCancel = () => setEditingProduct(null);
  const handleDelete = (id: string) => {
    // Delete logic here (remove from DB or state)
    alert('Delete product ' + id);
  };

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
        <h2 className="text-2xl font-bold mb-4">Manage Dashboard</h2>
        {/* Dashboard Edit Options */}
        <div className="flex flex-wrap gap-4 mb-8">
          {dashboardOptions.map(opt => (
            <button
              key={opt.label}
              className="px-6 py-2 rounded-lg bg-[#ff2c2c] text-white font-semibold hover:bg-[#e01b1b] transition shadow"
              onClick={opt.action}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* Editable Product List */}
        <div className="flex flex-wrap gap-6">
          {paginatedProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg border-2 border-gray-100 p-4 flex flex-col items-center w-64 mb-4">
              <Image
                src={Array.isArray(product.image) ? product.image[0] : product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded mb-2"
                width={96}
                height={96}
              />
              {editingProduct && editingProduct._id === product._id ? (
                <>
                  <input
                    className="border rounded px-2 py-1 mb-2 w-full"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                  <input
                    className="border rounded px-2 py-1 mb-2 w-full"
                    name="price"
                    type="number"
                    value={editForm.price}
                    onChange={handleEditChange}
                  />
                  <input
                    className="border rounded px-2 py-1 mb-2 w-full"
                    name="image"
                    value={editForm.image}
                    onChange={handleEditChange}
                  />
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleEditSave}>Save</button>
                    <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-semibold text-lg text-center mb-2">{product.name}</div>
                  <div className="text-[#ff2c2c] font-bold mb-2">${product.price}</div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditClick(product)}>Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
      {/* Admin Profile Card on the right */}
      <aside className="w-1/5 pr-4 pt-8 flex flex-col items-center sticky top-0 h-fit min-w-[320px] max-w-[360px]">
        <div className="bg-white rounded-xl border border-gray-200 shadow p-6 w-full flex flex-col items-center">
          <AdminProfile />
        </div>
        {/* Back to Top Button */}
        {showTopBtn && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 bg-[#ff2c2c] text-white rounded-full p-3 shadow-lg hover:bg-[#e01b1b] transition z-50"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </aside>
    </div>
  )
}

// AdminProfile component
function AdminProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@foodie.com',
    role: 'Administrator',
    phone: '+1234567890',
    avatar: '/assets/profile.jpg',
  });
  const [editForm, setEditForm] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setProfile(editForm);
    setEditing(false);
  };
  const handleCancel = () => {
    setEditForm(profile);
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Image src={profile.avatar} alt="Admin Avatar" width={96} height={96} className="w-24 h-24 rounded-full mb-4 border-2 border-[#ff2c2c] object-cover" />
      {editing ? (
        <>
          <input
            className="border rounded px-2 py-1 mb-2 w-full text-center"
            name="name"
            value={editForm.name}
            onChange={handleChange}
          />
          <input
            className="border rounded px-2 py-1 mb-2 w-full text-center"
            name="email"
            value={editForm.email}
            onChange={handleChange}
          />
          <input
            className="border rounded px-2 py-1 mb-2 w-full text-center"
            name="phone"
            value={editForm.phone}
            onChange={handleChange}
          />
          <div className="flex gap-2 mt-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
            <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="font-bold text-lg mb-1">{profile.name}</div>
          <div className="text-gray-600 mb-1">{profile.email}</div>
          <div className="text-gray-500 mb-1">{profile.phone}</div>
          <div className="text-xs text-[#ff2c2c] font-semibold mb-2">{profile.role}</div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

export default Home
