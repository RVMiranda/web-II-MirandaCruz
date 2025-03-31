import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ValidateLogin from "../utils/ValidateLogin";

export default function ProductDetail() {
    ValidateLogin();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Error en la respuesta");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    setCartMessage("");

    if (quantity > product.stock) {
      setCartMessage(`No se pueden agregar más de ${product.stock} unidades`);
      return;
    }

    const cartFromStorage = localStorage.getItem("cart");
    let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {

      const newQuantity = cart[existingProductIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        setCartMessage(`No se pueden agregar más de ${product.stock} unidades en total para este producto`);
        return;
      }
      cart[existingProductIndex].quantity = newQuantity;
    } else {

      if (cart.length >= 5) {
        setCartMessage("Solo se pueden tener máximo 5 productos diferentes en el carrito");
        return;
      }

      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        stock: product.stock,
        thumbnail: product.thumbnail,
      });
    }

    const totalCartValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (totalCartValue > 10000) {
      setCartMessage("El total del carrito no puede superar $10,000");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartMessage("Producto agregado al carrito");
  };

  return (
    <div className="product-detail">
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : product ? (
        <div className="product-detail-container">
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <div>
            <label htmlFor="quantity">Cantidad:</label>
            <input 
              type="number" 
              id="quantity" 
              min="1" 
              max={product.stock} 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
            />
          </div>
          <button onClick={addToCart}>AGREGAR AL CARRITO</button>
          <a href="/carrito">Ir al carrito</a>
          {cartMessage && <p>{cartMessage}</p>}
        </div>
      ) : null}
    </div>
  );
}
