import React from "react";
import { Link } from "react-router-dom";

function Products({ products, addToCart, selectProductHandler }) {
  return (
    <div>
      {products &&
        products.map((item) => (
          <div>
            <img onClick={() => selectProductHandler(item)} src={item.image_link}/>
            <p onClick={() => addToCart(item)}>{item.name}</p>
          </div>
        ))}

      <Link to="/cart">
        <button>Go to cart</button>
      </Link>
    </div>
  );
}

export default Products;
