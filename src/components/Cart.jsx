import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart,  incCartItems, decCartItems}) {
  return (
    <div>
        <h1>
        Cart Section | ${" "}
        {cart
          .reduce(
            (acc, cur) => (acc += cur.quantity * Number(cur.product.price)),
            0
          )
          .toFixed(2)}
      </h1>
      <hr />
      {cart.length > 0 &&
        cart.map((cartItem) => (
          <div className="card">
            <p>
              Product Name: {cartItem.product.name} | quantity:{" "}
              <button onClick={() => decCartItems(cartItem)}>-</button>{cartItem.quantity}<button onClick={() => incCartItems(cartItem)}>+</button>
            </p>
            <button onClick={() => removeFromCart(cartItem)}>
              Remove from cart
            </button>
          </div>
        ))}
       

<Link to='/'><button>Home</button></Link>
    </div>
  );
}

export default Cart;
