import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(savedCart);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = totalPrice * 0.9; // 10% discount

  return (
    <div className="cart container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item flex items-center justify-between p-4 border-b">
              <div>
              <img src={item.image} alt={item.title} className="w-full h-48 object-contain mb-4" />
                <h3 className="text-lg">{item.title}</h3>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
              <div >
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Increase
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Decrease
                </button>
              </div>
            </div>
          ))}
          <div className="total mt-4">
            <h3 className="text-lg">Total: ₹{discountedPrice.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <Link to="/" className="mt-4 text-blue-600">Back to Products</Link>
    </div>
  );
};

export default Cart;
