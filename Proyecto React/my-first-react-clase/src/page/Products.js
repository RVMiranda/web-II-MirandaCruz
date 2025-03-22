import ProductListItem from "../components/ProductListItem"
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../utils/ValidateLogin";
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