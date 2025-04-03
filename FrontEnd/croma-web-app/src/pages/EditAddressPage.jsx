import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditAddressPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [mapLocation, setMapLocation] = useState('');
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    nickName: '',
    pinCode: '',
    addressLine: '',
    landmark: '',
    locality: '',
    state: '',
    city: '',
    addressType: 'Home',
    isDefault: false
  });

  useEffect(() => {
    fetchAddress();
  }, [id]);

  useEffect(() => {
    // Handle the case when user clicks "Use Current Location"
    if (isUsingCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setIsUsingCurrentLocation(false);
        }
      );
    }
  }, [isUsingCurrentLocation]);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/address/${id}`);
      
      // Check if response.data has a data property (common API pattern)
      const address = response.data.data || response.data;
      
      setFormData({
        fullName: address.fullName,
        mobileNumber: address.mobileNumber,
        nickName: address.nickName,
        pinCode: address.pinCode,
        addressLine: address.addressLine,
        landmark: address.landmark || '',
        locality: address.locality,
        state: address.state,
        city: address.city,
        addressType: address.addressType,
        isDefault: address.isDefault
      });
      
      setMapLocation(address.mapLocation || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching address:', error);
      setLoading(false);
    }
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // In a real app, you would call a geocoding service here
      // For this example, we'll simulate one with a placeholder
      const response = await axios.get(`https://api.example.com/geocode?lat=${latitude}&lng=${longitude}`);
      
      // Simulated response
      const addressData = {
        fullAddress: '7HXF+8MW, Mirzapur, Uttar Pradesh 203209, India',
        pinCode: '203209',
        locality: 'Mirzapur',
        state: 'UTTAR PRADESH',
        city: 'JEWAR'
      };
      
      setMapLocation(addressData.fullAddress);
      setFormData({
        ...formData,
        pinCode: addressData.pinCode,
        locality: addressData.locality,
        state: addressData.state,
        city: addressData.city
      });
    } catch (error) {
      console.error('Error fetching address from coordinates:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for submission
      const addressData = {
        ...formData,
        mapLocation: mapLocation
      };
      
      await axios.put(`http://localhost:4000/address/${id}`, addressData);
      navigate('/my-account/address');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleSearchLocation = (e) => {
    e.preventDefault();
    // In a real app, this would call a geocoding service
    console.log("Searching for location:", e.target.elements.locationSearch.value);
  };

  const handleUseCurrentLocation = () => {
    setIsUsingCurrentLocation(true);
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white p-6 mt-22">
        <div className="flex items-center text-sm mb-6">
          <Link to="/my-account" className="hover:text-teal-500">My Account</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/my-account/address" className="hover:text-teal-500">My Addresses</Link>
          <span className="mx-2">&gt;</span>
          <span>Edit Address</span>
        </div>
        <p>Loading address data...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-6 mt-22">
      <div className="flex items-center text-sm mb-6">
        <Link to="/my-account" className="hover:text-teal-500">My Account</Link>
        <span className="mx-2">&gt;</span>
        <Link to="/my-account/address" className="hover:text-teal-500">My Addresses</Link>
        <span className="mx-2">&gt;</span>
        <span>Edit Address</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Edit Address</h1>
      
      <div className="border-b border-gray-800 pb-6 mb-6">
        <h2 className="mb-4">Search your location</h2>
        <form onSubmit={handleSearchLocation} className="mb-4">
          <div className="flex">
            <input
              type="text"
              name="locationSearch"
              placeholder="Search for building name, landmark, street, area..."
              className="w-full bg-white text-black p-3 rounded-l outline-none"
            />
            <button 
              type="submit"
              className="bg-white text-black px-4 rounded-r border-l border-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
        
        <button 
          onClick={handleUseCurrentLocation}
          className="w-full flex items-center justify-between bg-black border border-gray-700 text-white p-3 rounded mb-4 hover:bg-gray-900"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Use Current Location (GPS)
          </div>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        {mapLocation && (
          <div className="mb-4">
            <div className="bg-gray-200 h-64 rounded relative mb-4">
              {/* This would be a real map in production */}
              <div className="absolute inset-0 flex items-center justify-center text-black">
                Map View - {mapLocation}
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-black border border-gray-700 p-3 rounded">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                {mapLocation}
              </div>
              <button className="text-teal-500">Change</button>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2">
              Full Name*
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full name"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Mobile Number*
            </label>
            <div className="flex">
              <div className="bg-black border border-gray-700 border-r-0 rounded-l p-3">
                +91
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full bg-black border border-gray-700 rounded-r p-3"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2">
              Address Nick Name*
            </label>
            <input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Enter Nick Name"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Pin Code*
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Address (Flat no., Building, Company, Street)*
            </label>
            <input
              type="text"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              placeholder="Flat no./Building Name/Society"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Landmark*
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">
            Locality / Sector / Area*
          </label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="Locality / Sector / Area"
            className="w-full bg-black border border-gray-700 rounded p-3"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2">
              State*
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="state"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="city"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-4">
            Address Type
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Home"
                checked={formData.addressType === 'Home'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Home
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Work"
                checked={formData.addressType === 'Work'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Work
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Other"
                checked={formData.addressType === 'Other'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Other
            </label>
          </div>
        </div>
        
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="mr-2"
            />
            Make This My Default Address
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/my-account/address')}
            className="border border-gray-700 text-white rounded px-6 py-3 hover:bg-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white rounded px-6 py-3 hover:bg-teal-600"
          >
            Update Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddressPage;