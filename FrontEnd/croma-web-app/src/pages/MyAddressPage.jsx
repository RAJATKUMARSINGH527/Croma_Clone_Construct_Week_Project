import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MyAddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/address');
      const data = await response.json();
      console.log("Fetched Addresses:", data);
      setAddresses(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await fetch(`http://localhost:4000/address/${addressId}`, {
        method: 'DELETE',
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await fetch(`http://localhost:4000/address/${addressId}/default`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 pt-25">
      <div className="flex items-center text-sm mb-6">
        <Link to="/my-account" className="hover:text-teal-500">My Account</Link>
        <span className="mx-2">&gt;</span>
        <span>My Addresses</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <button 
          onClick={() => navigate('/my-account/address/add')}
          className="flex items-center text-teal-500 hover:text-teal-400"
        >
          <span className="mr-1">+</span> ADD NEW ADDRESS
        </button>
      </div>

      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p>No addresses found. Add a new address to get started.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div 
              key={address._id} 
              className="border border-gray-700 rounded-lg p-6 relative"
            >
              {address.isDefault && (
                <div className="absolute top-4 right-4 bg-teal-600 text-xs px-3 py-1 rounded-full">
                  DEFAULT ADDRESS
                </div>
              )}
              <div className="mb-4">
                <h2 className="text-teal-500 text-lg uppercase mb-2">{address.addressType}</h2>
                <p className="text-gray-300 mb-1">{address.fullAddress}</p>
              </div>

              <div className="flex items-center mt-6 mb-4">
                {!address.isDefault && (
                  <div 
                    className="flex items-center cursor-pointer mr-6"
                    onClick={() => handleSetDefault(address._id)}
                  >
                    <div className="w-5 h-5 border border-teal-500 rounded flex items-center justify-center mr-2">
                      <div className="w-3 h-3 rounded-sm"></div>
                    </div>
                    <span className="text-sm">Set as default</span>
                  </div>
                )}
                <div className="text-sm">
                  Address Type: <span className="font-semibold">{address.addressType}</span>
                </div>
              </div>

              <div className="flex mt-4">
                <button 
                  onClick={() => handleDeleteAddress(address._id)} 
                  className="border border-gray-700 rounded px-6 py-2 mr-3 hover:bg-gray-900"
                >
                  DELETE
                </button>
                <button 
                  onClick={() => navigate(`/my-account/address/edit/${address._id}`)}
                  className="border border-gray-700 rounded px-6 py-2 hover:bg-gray-900"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddressesPage;
