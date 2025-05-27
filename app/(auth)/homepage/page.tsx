"use client"
import React, { useRef, useEffect, useState } from 'react'
import TopHeader from '@/components/TopHeader';
import Image from 'next/image';
import UserHeader from '@/components/UserHeader';
import Footer from '@/components/Footer';

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
          <h1 className="text-4xl font-extrabold text-[#ff2c2c] mb-2">Welcome to Foodie Resto</h1>
          <p className="text-lg text-gray-700 mb-4 text-left max-w-2xl">
            Discover and order your favorite meals, snacks, and drinks from the best local restaurants. Fast delivery, great taste, and a world of options!
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
            <span className="font-semibold text-[#ff2c2c]">Foodie Resto</span> is more than just a food delivery platform—it's a movement to empower local businesses, celebrate culinary diversity, and make quality food accessible to everyone. We believe food brings people together, and our mission is to connect communities through the joy of great meals.
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base mb-4">
            <li>Supporting local restaurants and small businesses to thrive in a digital world</li>
            <li>Promoting healthy, diverse, and sustainable food choices</li>
            <li>Creating job opportunities and fostering entrepreneurship in the food industry</li>
            <li>Reducing food waste through smart logistics and partnerships</li>
            <li>Giving back: We regularly support food banks and community initiatives</li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            Our impact is measured not just in meals delivered, but in the positive change we help create for our partners, customers, and communities. Join us as we continue to make a difference—one order at a time.
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff2c2c] mb-4">About Resto</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            <span className="font-semibold text-[#ff2c2c]">Foodie Resto</span> was founded in 2022 with a vision to revolutionize the way people experience food delivery. Our journey began with a small team of passionate foodies and tech enthusiasts who wanted to make great food accessible, fast, and enjoyable for everyone.
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Since our launch, we've grown into a vibrant platform connecting thousands of customers with the best local restaurants and chefs. We believe in supporting local businesses, celebrating culinary diversity, and delivering happiness to your doorstep—one meal at a time.
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base mb-4">
            <li>Founded in 2022, now serving a growing community of food lovers</li>
            <li>Carefully curated partnerships with top-rated local restaurants and chefs</li>
            <li>Lightning-fast, reliable delivery with real-time order tracking</li>
            <li>Easy-to-use platform with secure payments and personalized recommendations</li>
            <li>Dedicated to quality, food safety, and customer satisfaction</li>
            <li>24/7 customer support to help you anytime</li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            Whether you&apos;re craving comfort food, exploring new cuisines, or planning a family feast, Resto is here to make every meal memorable. Thank you for being part of our story!
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
            We love hearing from you! Whether you have a question, feedback, partnership inquiry, or need support, our team is here to help. Reach out to us anytime and we&apos;ll get back to you as soon as possible.
          </p>
          <ul className="mb-4 text-gray-700 text-base md:text-lg">
            <li className="mb-2"><span className="font-semibold">Email:</span> <a href="mailto:support@foodie.com" className="text-[#ff2c2c] underline">support@foodie.com</a></li>
            <li className="mb-2"><span className="font-semibold">Phone:</span> <a href="tel:+1234567890" className="text-[#ff2c2c] underline">+1 234 567 890</a></li>
            <li className="mb-2"><span className="font-semibold">Address:</span> 123 Foodie Lane, Flavor Town, USA</li>
            <li className="mb-2"><span className="font-semibold">Customer Support:</span> 24/7 live chat and email support</li>
            <li className="mb-2"><span className="font-semibold">Business Inquiries:</span> <a href="mailto:partners@foodie.com" className="text-[#ff2c2c] underline">partners@foodie.com</a></li>
          </ul>
          <p className="text-gray-700 text-base md:text-lg">
            You can also connect with us on social media for the latest updates, offers, and food inspiration!
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#ff2c2c] text-2xl">Fb</a>
            <a href="#" aria-label="Instagram" className="hover:text-[#ff2c2c] text-2xl">Ig</a>
            <a href="#" aria-label="Twitter" className="hover:text-[#ff2c2c] text-2xl">Tw</a>
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
