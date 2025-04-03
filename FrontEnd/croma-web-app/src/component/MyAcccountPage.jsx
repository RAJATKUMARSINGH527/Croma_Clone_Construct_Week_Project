import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MyAccountPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const userVerified = localStorage.getItem('isVerified') === 'true';
    setIsVerified(userVerified);

    const path = location.pathname.split('/')[2];
    if (path) setActiveSection(path);
  }, [location.pathname]);

  useEffect(() => {
    if (!isVerified && activeSection) {
      navigate('/login');
    }
  }, [isVerified, activeSection, navigate]);

  const handleSectionClick = (sectionId) => {
    if (!isVerified) {
      navigate('/login');
      return;
    }

    if (sectionId === 'my-profile') {
      navigate('/myprofile');
      return;
    }
    if (sectionId === 'address') {
      navigate('/address');
      return;
    }
    if (sectionId === 'orders') {
      navigate('/orders');
      return;
    }
    if (sectionId === 'offers') {
      navigate('/offers');
      return;
    }
    if (sectionId === 'wishlist') {
      navigate('/wishlist');
      return;
    }
    if (sectionId === 'devices') {
      navigate('/devices');
      return;
    }
    if (sectionId === 'service') {
      navigate('/service');
      return;
    }
    // Set the active section and navigate to the corresponding route
    setActiveSection(sectionId);
    navigate(`/my-account/${sectionId}`);
  };

  const sections = [
    { id: 'my-profile', title: 'My Profile', description: 'Edit your basic details' },
    { id: 'address', title: 'My Address', description: 'Manage your saved addresses' },
    { id: 'orders', title: 'My Orders', description: 'View, track, cancel orders and buy again' },
    { id: 'offers', title: 'My Privilege Offers', description: 'Exclusive offers for you' },
    { id: 'wishlist', title: 'My Wishlist', description: 'Have a look at your favourite products' },
    { id: 'devices', title: 'My Devices & Plans', description: 'Manage your devices and plans' },
    { id: 'service', title: 'My Service Requests', description: 'Manage complaints, feedback, service requests' },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-6 mt-22">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`border ${activeSection === section.id ? 'border-teal-500' : 'border-gray-700'} rounded-lg p-6 cursor-pointer hover:bg-gray-900 transition-colors`}
            onClick={() => handleSectionClick(section.id)}
          >
            <h2 className="text-lg font-bold">{section.title}</h2>
            <p className="text-gray-400">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccountPage;
