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

  // Dashboard modal/section state
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Dashboard Edit Options with handlers
  const dashboardOptions = [
    { label: 'Manage Products', action: () => setActiveSection('products') },
    { label: 'Manage Orders', action: () => setActiveSection('orders') },
    { label: 'Manage Users', action: () => setActiveSection('users') },
    { label: 'Site Settings', action: () => setActiveSection('settings') },
    { label: 'View Analytics', action: () => setActiveSection('analytics') },
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
        {/* Dashboard Sections */}
        {activeSection === 'products' && (
          <div className="mb-8 p-6 bg-white rounded shadow border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Manage Products</h3>
            <p>Here you can add, edit, or delete products. (Demo: Use the product list below.)</p>
            <button className="mt-2 text-[#ff2c2c] underline" onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {activeSection === 'orders' && (
          <div className="mb-8 p-6 bg-white rounded shadow border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1001</td>
                  <td>Jane Doe</td>
                  <td><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span></td>
                  <td>8,000 FCFA</td>
                  <td><button className="bg-green-500 text-white px-2 py-1 rounded">Mark as Complete</button></td>
                </tr>
                <tr>
                  <td>#1002</td>
                  <td>John Smith</td>
                  <td><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Completed</span></td>
                  <td>5,500 FCFA</td>
                  <td><button className="bg-gray-400 text-white px-2 py-1 rounded">View</button></td>
                </tr>
              </tbody>
            </table>
            <button className="mt-2 text-[#ff2c2c] underline" onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {activeSection === 'users' && (
          <div className="mb-8 p-6 bg-white rounded shadow border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Manage Users</h3>
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b">
                  <th className="py-2">User</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe</td>
                  <td>jane@example.com</td>
                  <td>User</td>
                  <td><button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button></td>
                </tr>
                <tr>
                  <td>John Smith</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td><button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
                </tr>
              </tbody>
            </table>
            <button className="mt-2 text-[#ff2c2c] underline" onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {activeSection === 'settings' && (
          <div className="mb-8 p-6 bg-white rounded shadow border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Site Settings</h3>
            <form className="flex flex-col gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-1">Site Title</label>
                <input type="text" className="border rounded px-3 py-2 w-full" defaultValue="Cameroon Flavors" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Enable Quick Order</label>
                <input type="checkbox" className="ml-2" defaultChecked />
              </div>
              <div>
                <label className="block font-semibold mb-1">Delivery Fee (FCFA)</label>
                <input type="number" className="border rounded px-3 py-2 w-full" defaultValue={500} />
              </div>
              <button className="bg-[#ff2c2c] text-white px-4 py-2 rounded font-bold mt-2 w-fit">Save Settings</button>
            </form>
            <button className="mt-2 text-[#ff2c2c] underline" onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {activeSection === 'analytics' && (
          <div className="mb-8 p-6 bg-white rounded shadow border border-gray-200">
            <h3 className="text-xl font-bold mb-4">View Analytics</h3>
            <div className="mb-4">
              <div className="font-semibold">Total Orders: <span className="text-[#ff2c2c]">120</span></div>
              <div className="font-semibold">Total Users: <span className="text-[#ff2c2c]">45</span></div>
              <div className="font-semibold">Total Revenue: <span className="text-[#ff2c2c]">1,200,000 FCFA</span></div>
            </div>
            <button className="mt-2 text-[#ff2c2c] underline" onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
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
                  {editForm.image && editForm.image.trim() !== '' && (
                    <Image
                      src={editForm.image}
                      alt={editForm.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded mb-2 border"
                    />
                  )}
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
                  <div className="text-[#ff2c2c] font-bold mb-2">{product.price.toLocaleString()} FCFA</div>
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
      </aside>
      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#ff2c2c] text-white rounded-full p-4 shadow-lg hover:bg-[#e01b1b] transition z-50"
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
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = '/login';
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
          <button className="bg-red-500 text-white px-3 py-1 rounded mt-2" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Home
