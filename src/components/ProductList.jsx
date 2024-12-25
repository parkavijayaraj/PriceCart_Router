import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Add or remove product from the cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      updatedCart[productIndex].quantity += 1;
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <div className="product-list container mx-auto p-4">
        <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
        <Link to="/cart" className="mt-4 text-lg text-blue-600">Go to Cart ({cart.length})</Link>
        </div>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="product-card border p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold text-xl mt-2">₹{product.price}</p>
            <button
              onClick={() => isProductInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg"
            >
              {isProductInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ProductList;
