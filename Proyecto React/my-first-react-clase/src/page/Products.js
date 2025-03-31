import ProductListItem from "../components/ProductListItem"
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../utils/ValidateLogin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
/*export default function Products() {
    return (
        <div>
            <h1>Products</h1>
            <div className="container-products">
                <ProductListItem/>
                <ProductListItem/>
            </div>
        </div>
    )
}*/

/*
export default function Products() {
    ValidateLogin();
    return (
      <div className="container-products">
        <h1>Products</h1>
  
        <ProductListItem
          title="Funko Pop de Michael Jackson duanrte su HIStory World Tour"
          date="1997"
          imageUrl="https://m.media-amazon.com/images/I/716A9oC0i2L._AC_UF894,1000_QL80_.jpg" 
        />
  
        <ProductListItem
          title="Funko Pop de Michael Jackson durante su epoca de Thriller"
          date="1982"
          imageUrl="https://limitededition.mx/cdn/shop/files/3cef98e0-2354-4fc6-98f5-f02a1a5e6f51_1200x1200.jpg?v=1742335771" 
        />
  
        <ProductListItem
          title="Funko Pop de Michael Jackson de Smoth Criminal"
          date="1987"
          imageUrl="https://m.media-amazon.com/images/I/61aq8+aSWqL.jpg" 
        />
      </div>
    );
  }
  */

export default function Products(){
  ValidateLogin();
  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState(null);
  const [word, setWord] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {

  }
  )

  useEffect(() => {
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
      //const data = await getProducts();
      //setProducts(data.products);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const hasWord = word !== null && word !== undefined && word.length > 3;
    if (!hasWord) return;

    const fetchProductsByWord = async () => {
      setLoading(true);
      try {
        const data = await getProductsByWord(word);
        setProducts(data.products);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
      //const data = await getProductsByWord(word);
      //setProducts(data.products);
    }

    fetchProductsByWord();
  }, [word]);

  return (
    <div>
      <h1>Products</h1>
      <div className="container-products">
        <input type="text" placeholder="Search" onChange={(e) => setWord(e.target.value)} />
        {loading ? (
          <p> Cargando...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          products && products.length === 0 ? (
            <p>No se encontraron productos</p>
          ) : products ? (
            <>
              <p>Total encontrados: {products.length}</p>
              {products.map((item) => (
                <ProductListItem 
                  key={item.id}
                  title={item.title} 
                  id={item.id}
                  description={item.description} 
                  images={item.images} 
                />
              ))}
            </>
          ) : (
            <p>No se encontraron productos</p>
          )
        )}
      </div>
    </div>
  )
}

async function getProducts(){
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
}

async function getProductsByWord(word){
  const response = await fetch(`https://dummyjson.com/products/search?q=${word}`);
  const data = await response.json();
  return data;
}