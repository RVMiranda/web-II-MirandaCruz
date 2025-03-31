import React, { useEffect, useState } from 'react';
import "../style/carrito.css";

export default function Carrito() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const totalCartValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compra</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  style={{ width: '100px', height: 'auto' }} 
                />
                <h2>{item.title}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio Unitario: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <h2>Total del Carrito: ${totalCartValue}</h2>
          <button onClick={emptyCart}>Vaciar Carrito</button>
        </div>
      )}
    </div>
  );
}
