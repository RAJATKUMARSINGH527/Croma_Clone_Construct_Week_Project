import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const NavbarUserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle mouse enter and leave events
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Handle icon click
  const handleIconClick = (e) => {
    e.preventDefault();
    navigate('/my-account');
  };

  const handleLogout = () => {
    localStorage.removeItem('isVerified');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Close when clicking outside
  useEffect(() => {
    const userVerified = localStorage.getItem('isVerified') === 'true';
    setIsLoggedIn(userVerified);
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Define base menu items (excluding login/logout which will be conditionally added)
  const baseMenuItems = [
    {
      id: 'my-profile',
      title: 'My Profile',
      description: 'Edit your basic details',
      link: '/myprofile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 11V7a4 4 0 0 0-8 0v4"></path>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        </svg>
      )
    },
    {
      id: 'address',
      title: 'My Address',
      description: 'Manage your saved addresses',
      link: '/address',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'orders',
      title: 'My Orders',
      description: 'View, track, cancel orders and buy again',
      link: '/orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
          <path d="M16.5 9.4 7.55 4.24"></path>
        </svg>
      )
    },
    {
      id: 'offers',
      title: 'My Privilege Offers',
      description: 'Exclusive offers for you',
      link: '/offers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      )
    },
    {
      id: 'wishlist',
      title: 'My Wishlist',
      description: 'Have a look at your favourite products',
      link: '/wishlist',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      )
    },
    {
      id: 'devices',
      title: 'My Devices & Plans',
      description: 'Manage your devices and plans',
      link: '/devices',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: 'service',
      title: 'My Service Requests',
      description: 'Manage complaints, feedback, service requests',
      link: '/service',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    }
  ];

  // Create the login/logout item based on login status
  const authItem = isLoggedIn ? 
    {
      id: 'logout',
      title: 'Logout',
      description: 'Sign out of your account',
      action: handleLogout, // Special case - use action instead of link
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      )
    } : 
    {
      id: 'login',
      title: 'Login',
      description: 'Sign in to your account',
      link: '/login',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      )
    };

  // Combine the base menu items with the auth item
  const menuItems = [...baseMenuItems, authItem];

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={handleIconClick} 
        className="focus:outline-none" 
        aria-label="User account"
      >
        <User size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-black text-white rounded shadow-lg z-10 border-r-2 border-teal-400">
          <div className="py-1">
            {menuItems.map((item) => (
              item.action ? (
                // If it has an action (like logout), use a button
                <div 
                  key={item.id}
                  className="block px-4 py-3 hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    item.action();
                  }}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 flex items-center justify-center text-gray-400">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-sm text-gray-400">{item.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Otherwise use a Link component for proper routing
                <Link
                  key={item.id}
                  to={item.link}
                  className="block px-4 py-3 hover:bg-gray-800 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 flex items-center justify-center text-gray-400">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-sm text-gray-400">{item.description}</div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUserDropdown;