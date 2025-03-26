import React from 'react';
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-8 flex flex-col md:grid md:grid-cols-3 gap-6">
      {/* Connect With Us Section */}
      <div>
        <h3 className="font-bold mb-4">CONNECT WITH US</h3>
        <div className="flex items-center mb-4 w-full">
          <input 
            type="email" 
            placeholder="Enter Email ID" 
            className="bg-gray-800 text-white px-3 py-2 rounded-l-md flex-grow w-full md:w-auto"
          />
          <button className="bg-gray-700 px-4 py-2 rounded-r-md">
            →
          </button>
        </div>
        <div className="flex space-x-4">
          {[Youtube, Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
            <Icon key={index} className="text-white hover:text-gray-400 cursor-pointer" />
          ))}
        </div>
      </div>

      {/* Useful Links Section */}
      <div>
        <h3 className="font-bold mb-4">USEFUL LINKS</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            'About Croma', 'Site Map', 
            'Help And Support', 'Careers At Croma', 
            'FAQs', 'Terms Of Use',
            'Buying Guide', 'Disclaimer',
            'Return Policy', 'Privacy Policy',
            'B2B Orders', 'Unboxed',
            'Store Locator', 'Gift Card',
            'E-Waste', 'Croma E-Star',
            'Franchise Opportunity'
          ].map((link, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-gray-300 hover:text-white text-sm"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h3 className="font-bold mb-4">PRODUCTS</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Televisions & Accessories', 'Grooming & Personal Care',
            'Home Appliances', 'Cameras & Accessories',
            'Phones & Wearables', 'Smart Devices',
            'Computers & Tablets', 'Gaming',
            'Kitchen Appliances', 'Accessories',
            'Audio & Video', 'Top Brands',
            'Health & Fitness'
          ].map((product, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-gray-300 hover:text-white text-sm"
            >
              {product}
            </a>
          ))}
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="col-span-3 border-t border-gray-700 my-4"></div>

      {/* Copyright */}
      <div className="col-span-3 text-center text-sm">
        © Copyright 2025 Croma. All rights reserved
      </div>
    </footer>
  );
}
