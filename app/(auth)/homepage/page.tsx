"use client"
import React, { useRef, useEffect, useState } from 'react'
import TopHeader from '@/components/TopHeader';
import Image from 'next/image';
import UserHeader from '@/components/UserHeader';
import Footer from '@/components/Footer';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ClientHome = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'contact'>('home');

  // Scroll to About or Contact section if triggered from header
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection('about');
      } else if (window.location.hash === '#contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection('contact');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Detect scroll to About or Contact section
  useEffect(() => {
    const onScroll = () => {
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
          setActiveSection('contact');
          return;
        }
      }
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
          setActiveSection('about');
          return;
        }
      }
      setActiveSection('home');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader activePage={activeSection} />
      {/* Hero Section */}
      <section className="w-4/5 mx-auto bg-[#fff6f6] py-12 flex flex-col md:flex-row items-center justify-center mb-8 gap-8 md:gap-16">
        <div className="flex-1 flex flex-col items-start md:items-start justify-center max-w-xl px-4">
          <h1 className="text-4xl font-extrabold text-[#ff2c2c] mb-4">Welcome to Cameroon Flavors</h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover the best of Cameroon! Cameroon Flavors brings you a wide variety of delicious traditional meals, snacks, and drinks from all ten regions. Order online, enjoy fast delivery, and experience the taste of Cameroon’s culinary heritage.
          </p>
          <a href="/menu" className="inline-block bg-[#ff2c2c] text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-[#e01b1b] transition text-lg mt-2">See Menu</a>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/assets/hero_img.png" alt="Hero" width={320} height={180} className="rounded-xl shadow-lg" />
        </div>
      </section>
      {/* Impact & Mission Section */}
      <section className="w-4/5 mx-auto py-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-8">
        <div className="flex-1 flex justify-center mb-6 md:mb-0 order-2 md:order-1">
          <Image src="/assets/story.png" alt="Our Mission & Impact" width={340} height={220} className="rounded-xl shadow-md w-full max-w-xs object-cover" />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center px-2 order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff2c2c] mb-4">Our Mission & Impact</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            <span className="font-semibold text-[#ff2c2c]">Cameroon Flavors</span> is dedicated to promoting the rich culinary diversity of Cameroon. Our mission is to connect people with traditional meals from every region and tribe, supporting local cooks and celebrating our shared heritage.
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base mb-4">
            <li>Empowering local chefs and food entrepreneurs across Cameroon</li>
            <li>Showcasing authentic regional and tribal dishes</li>
            <li>Fostering cultural pride and culinary education</li>
            <li>Supporting community initiatives and food security</li>
            <li>Bringing Cameroonian cuisine to the world</li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            Join us in celebrating Cameroon’s food culture—one delicious meal at a time.
          </p>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="w-4/5 mx-auto py-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-8 scroll-mt-24"
      >
        <div className="flex-1 flex flex-col items-start justify-center px-2 order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff2c2c] mb-4">About Cameroon Flavors</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            <span className="font-semibold text-[#ff2c2c]">Cameroon Flavors</span> was founded to bring the taste of Cameroon’s ten regions to your table. Our platform connects you with the best traditional meals, prepared by local cooks who honor their heritage.
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            We celebrate the unique dishes of every tribe, making it easy for you to explore, order, and enjoy authentic Cameroonian cuisine. From Ndolé to Achu, Eru to Koki, we deliver the flavors of Cameroon to your home.
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base mb-4">
            <li>Featuring meals from all 10 regions and dozens of tribes</li>
            <li>Supporting local cooks and food artisans</li>
            <li>Promoting Cameroonian culture and culinary pride</li>
            <li>Safe, fast delivery and secure payments in FCFA</li>
            <li>24/7 customer support for your satisfaction</li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            Thank you for choosing Cameroon Flavors—your gateway to the best of our country’s cuisine!
          </p>
        </div>
        <div className="flex-1 flex justify-center mb-6 md:mb-0 order-1 md:order-2">
          <Image src="/assets/about_img.png" alt="About Resto" width={340} height={220} className="rounded-xl shadow-md w-full max-w-xs object-cover" />
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="w-4/5 mx-auto py-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-8 scroll-mt-24"
      >
        <div className="flex-1 flex flex-col items-start justify-center px-2 order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff2c2c] mb-4">Contact Us</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            We love hearing from you! For questions, feedback, or partnership inquiries about Cameroonian cuisine, our team is here to help. Reach out and we’ll respond as soon as possible.
          </p>
          <ul className="mb-4 text-gray-700 text-base md:text-lg">
            <li className="mb-2"><span className="font-semibold">Email:</span> <a href="mailto:support@cameroonflavors.com" className="text-[#ff2c2c] underline">support@cameroonflavors.com</a></li>
            <li className="mb-2"><span className="font-semibold">Phone:</span> <a href="tel:+237650000000" className="text-[#ff2c2c] underline">+237 650 000 000</a></li>
            <li className="mb-2"><span className="font-semibold">Address:</span> Yaoundé, Cameroon</li>
            <li className="mb-2"><span className="font-semibold">Customer Support:</span> 24/7 live chat and email support</li>
            <li className="mb-2"><span className="font-semibold">Business Inquiries:</span> <a href="mailto:partners@cameroonflavors.com" className="text-[#ff2c2c] underline">partners@cameroonflavors.com</a></li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            Connect with us on social media for the latest updates, offers, and Cameroonian food inspiration!
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#ff2c2c] text-2xl"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-[#ff2c2c] text-2xl"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-[#ff2c2c] text-2xl"><FaTwitter /></a>
          </div>
        </div>
        <div className="flex-1 flex justify-center mb-6 md:mb-0 order-2 md:order-1">
          <Image src="/assets/contact_img.png" alt="Contact Us" width={340} height={220} className="rounded-xl shadow-md w-full max-w-xs object-cover" />
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="w-full bg-[#fff6f6] py-10 mt-16 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-[#ff2c2c] mb-2">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 mb-4 text-center max-w-md">Get the latest updates, exclusive offers, and delicious deals delivered straight to your inbox!</p>
        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[#ff2c2c]"
          />
          <button
            type="submit"
            className="bg-[#ff2c2c] text-white px-6 py-2 rounded font-semibold hover:bg-[#e01b1b] transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Back to Top Button */}
    </div>
  );
};

export default ClientHome
