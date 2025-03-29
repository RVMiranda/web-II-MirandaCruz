import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";

export default function Productos() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts(id);
            setProduct(data.products);
        }
        fetchProducts();
    }, [id]);
    return (
        <div className="container-products">
            {product && <ProductListItem 
            title={product.title} 
            id={product.id} 
            description={product.description} 
            images={product.image} />}
        </div>
    )
}

async function getProducts(id){
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
}