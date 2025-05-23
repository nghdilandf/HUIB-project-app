"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const initialProducts = [
  { id: 1, name: 'Pizza Margherita', price: 12, details: 'Classic Italian pizza with tomatoes and mozzarella.', photo: '/assets/p_img1.png' },
  { id: 2, name: 'Burger', price: 8, details: 'Juicy beef burger with lettuce and tomato.', photo: '/assets/p_img2.png' },
  { id: 3, name: 'Chicken Wrap', price: 10, details: 'Grilled chicken wrap with veggies.', photo: '/assets/p_img3.png' },
];

const initialSettings = {
  siteTitle: 'Foodie',
  allowQuickOrder: true,
  deliveryFee: 5,
};

const initialImages = [
  '/assets/hero_img.png',
  '/assets/p_img1.png',
  '/assets/p_img2.png',
];

const Costomize = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', details: '', photo: '' });
  const [settings, setSettings] = useState(initialSettings);
  const [images, setImages] = useState(initialImages);

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.price && newProduct.details && newProduct.photo) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProduct.name,
          price: Number(newProduct.price),
          details: newProduct.details,
          photo: newProduct.photo,
        },
      ]);
      setNewProduct({ name: '', price: '', details: '', photo: '' });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (idx: number, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImages(images.map((img, i) => (i === idx ? url : img)));
    }
  };

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      setNewProduct({ ...newProduct, photo: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#000000]">Site Customization</h1>
      {/* Product Management */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1"
            placeholder="Add new product..."
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <button
            className="bg-[#ff2c2c] text-white px-4 py-2 rounded hover:bg-[#e01b1b] transition font-semibold"
            onClick={handleAddProduct}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Product heading..."
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Price ($)"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            min={0}
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Product details..."
            value={newProduct.details}
            onChange={e => setNewProduct({ ...newProduct, details: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => handlePhotoChange(e.target.files?.[0] || null)}
            className="text-xs"
          />
          {newProduct.photo && (
            <Image src={newProduct.photo} alt="Preview" width={80} height={60} className="rounded border mb-2" />
          )}
          <button
            className="bg-[#ff2c2c] text-white px-4 py-2 rounded hover:bg-[#e01b1b] transition font-semibold"
            onClick={handleAddProduct}
            disabled={!(newProduct.name && newProduct.price && newProduct.details && newProduct.photo)}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {products.map(p => (
            <li key={p.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded gap-4">
              <div className="flex items-center gap-3">
                <Image src={p.photo} alt={p.name} width={48} height={36} className="rounded border" />
                <div>
                  <div className="font-semibold">{p.name} <span className="text-xs text-gray-400">${p.price}</span></div>
                  <div className="text-xs text-gray-500">{p.details}</div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
                onClick={() => handleDeleteProduct(p.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* System Settings */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Site Title</label>
            <input
              type="text"
              name="siteTitle"
              className="border rounded px-3 py-2 w-full"
              value={settings.siteTitle}
              onChange={handleSettingChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowQuickOrder"
              checked={settings.allowQuickOrder}
              onChange={handleSettingChange}
              id="allowQuickOrder"
            />
            <label htmlFor="allowQuickOrder" className="font-medium">Allow Quick Order</label>
          </div>
          <div>
            <label className="block font-medium mb-1">Delivery Fee ($)</label>
            <input
              type="number"
              name="deliveryFee"
              className="border rounded px-3 py-2 w-32"
              value={settings.deliveryFee}
              onChange={handleSettingChange}
              min={0}
            />
          </div>
        </div>
      </div>
      {/* Site Preview Images */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Site Preview Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <Image src={img} alt={`Preview ${idx + 1}`} width={128} height={96} className="w-32 h-24 object-cover rounded mb-2 border" />
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageChange(idx, e.target.files?.[0] || null)}
                className="text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Costomize;
