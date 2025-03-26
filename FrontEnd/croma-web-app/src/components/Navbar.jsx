import React, { useState } from 'react';
import { Search, MapPin, User, ShoppingCart, Menu, X, ChevronRight, Crown, Tag, Store, CreditCard } from 'lucide-react';

export default function CromaNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kitchen Appliances');

  const categories = [
    { name: "Televisions & Accessories", icon: null },
    { name: "Home Appliances", icon: null },
    { name: "Phones & Wearables", icon: null },
    { name: "Computers & Tablets", icon: null },
    { name: "Kitchen Appliances", icon: null },
    { name: "Audio & Video", icon: null },
    { name: "Health & Fitness", icon: null },
    { name: "Grooming & Personal Care", icon: null },
  ];

  const subcategories = {
    "Kitchen Appliances": [
      "All Kitchen Appliances",
      "Dishwashers",
      "Microwave & Ovens",
      "Microwave Accessories",
      "Water Purifiers & Dispensers",
      "Stoves & Cooktops",
      "Electric Chimneys",
      "Food Preparation Appliances",
      "Steamers & Cookers",
      "Beverage Makers",
      "Toasters & Sandwich Makers",
      "Cooking Appliances",
      "Cooking Utensils",
      "Kitchen Utilities",
      "Cookware Accessories",
      "Flour Mill Machines"
    ]
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative">
      <nav className="bg-black text-white w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left section - Logo and Menu */}
          <div className="flex items-center space-x-4">
            {/* Croma Logo */}
            <div className="text-2xl font-bold">
              <span>croma</span>
              <span className="text-green-400">̄</span>
            </div>
            
            {/* Menu Toggle */}
            <button className="flex items-center text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="ml-1 text-sm">Menu</span>
            </button>
          </div>
          
          {/* Middle Section - Search Bar */}
          <div className="flex flex-1 mx-4 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for ?"
                className="w-full py-2 px-4 rounded-md bg-white text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-r-md h-8 flex items-center px-2">
                <Search className="text-gray-500" size={20} />
              </button>
            </div>
          </div>
          
          {/* Right Section - Location, User, Cart */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="flex items-center">
              <MapPin size={20} />
              <div className="ml-1 hidden md:flex flex-col">
                <div className="flex items-center">
                  <span className="text-sm mr-1">Mumbai, 400049</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
            
            {/* User Account */}
            <div>
              <User size={20} />
            </div>
            
            {/* Shopping Cart */}
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-green-400 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-gray-800 text-white z-50 flex border-t border-gray-700">
          {/* Left Menu Panel */}
          <div className="w-1/3 border-r border-gray-700">
            {/* Exclusive at Croma */}
            <div className="px-4 py-3 flex items-center border-b border-gray-700">
              <Crown size={20} className="mr-2" />
              <span className="font-medium">Exclusive At Croma</span>
            </div>
            
            {/* Top Brands */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center">
                <Tag size={20} className="mr-2" />
                <span className="font-medium">Top Brands</span>
              </div>
              <ChevronRight size={18} />
            </div>
            
            {/* Croma Store Locator */}
            <div className="px-4 py-3 flex items-center border-b border-gray-700">
              <Store size={20} className="mr-2" />
              <span className="font-medium">Croma Store Locator</span>
            </div>
            
            {/* Gift Card */}
            <div className="px-4 py-3 flex items-center border-b border-gray-700">
              <CreditCard size={20} className="mr-2" />
              <span className="font-medium">Gift Card</span>
            </div>
            
            {/* Shop by Category Heading */}
            <div className="px-4 py-3 font-bold text-lg border-b border-gray-700">
              Shop by Category
            </div>
            
            {/* Category List */}
            <div className="max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  className={px-4 py-3 flex items-center justify-between cursor-pointer ${selectedCategory === category.name ? 'bg-green-400 text-black' : 'hover:bg-gray-700'}}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <span>{category.name}</span>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Subcategory Panel */}
          <div className="w-2/3 bg-gray-800 max-h-96 overflow-y-auto">
            {subcategories[selectedCategory] && (
              <div className="p-4">
                {subcategories[selectedCategory].map((subcat, index) => (
                  <div 
                    key={index}
                    className={py-3 px-4 flex items-center justify-between cursor-pointer ${subcat === 'Electric Chimneys' ? 'bg-green-400 text-black' : 'hover:bg-gray-700'}}
                  >
                    <span>{subcat}</span>
                    {['Microwave & Ovens', 'Water Purifiers & Dispensers', 'Stoves & Cooktops', 'Food Preparation Appliances', 'Steamers & Cookers', 'Beverage Makers', 'Toasters & Sandwich Makers', 'Cooking Appliances', 'Kitchen Utilities'].includes(subcat) && <ChevronRight size={18} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}