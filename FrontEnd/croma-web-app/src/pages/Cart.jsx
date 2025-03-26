import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: 'Sample Product',
      price: 19.99
    };
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="  w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">YOUR CART</h1>
        
        <div className="mb-4">
          <svg 
            className="mx-auto w-24 h-24 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 mb-4">Your Cart Is Empty</p>
        ) : (
          <div className="mb-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
              >
                <span>{item.name}</span>
                <div>
                  <span className="mr-2">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={addToCart}
          className="text-green-600 hover:text-green-800 underline"
        >
          continue shopping
        </button>
      </div>
    </div>
  );
}