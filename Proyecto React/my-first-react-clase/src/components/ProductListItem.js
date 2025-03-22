import "../style/products.css";

/*export default function ProductListItem(){
    return (
        <div className="product-list-item">
            <div className="product-image">
                <img src="https://m.media-amazon.com/images/I/716A9oC0i2L._AC_UF894,1000_QL80_.jpg" alt="Product Image"/>
            </div>
            <div className="product-info">
                <h4> Funko  </h4>
                <p> Funko Pop de Michael Jackson duanrte su HIStory World Tour </p>
            </div>
        </div>
    )
}*/

export default function ProductListItem({ title, date, imageUrl }) {
    return (
      <div className="product-list-item">
        <div className="product-image">
          <img src={imageUrl} alt="Product Image" />
        </div>
        <div className="product-info">
          <h2 className="product-title">{title}</h2>
          <p className="product-date">{date}</p>
        </div>
      </div>
    );
  }