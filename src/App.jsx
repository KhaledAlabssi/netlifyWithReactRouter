import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { Route, Routes, useNavigate } from "react-router-dom";
import Product from "./components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [selectedProduct, setselectedProduct] = useState();
  const navigate = useNavigate();

  function removeFromCart(item) {
    const result = cart.filter((ele) => ele.product.id != item.product.id);

    setCart((i) => result);
  }

  function selectProductHandler(item) {
    setselectedProduct(item);
    navigate("/product");
  }

  function incCartItems(item) {
    const result = cart.map((i) => {
      if (i.product.id == item.product.id) {
        i.quantity += 1;
      }
      return i;
    });

    setCart((i) => result);
  }

  function decCartItems(item) {
    const found = cart.find((ele) => ele.product.id == item.product.id);
    let biggerThan1 = found.quantity > 1;

    if (biggerThan1) {
      // decrease quantity
      const result = cart.map((i) => {
        if (i.product.id == item.product.id) {
          i.quantity -= 1;
        }
        return i;
      });

      setCart((i) => result);
    } else {
      removeFromCart(item);
    }
  }

  // cart item example
  // [{product: {id, price, name}, quantity: 1}]
  function addToCart(item) {
    // check if item exist in array...
    if (cart.find((i) => i.product.id == item.id)) {
      const result = cart.map((i) => {
        if (i.product.id == item.id) {
          i.quantity += 1;
        }
        return i;
      });

      setCart((i) => result);
    } else {
      setCart((i) => [...i, { product: item, quantity: 1 }]);
    }
  }

  function getProducts() {
    axios(
      "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=mascara"
    )
      .then((res) => setProducts((i) => res.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <FontAwesomeIcon icon={faInstagram} />
      <ion-icon name="trash-outline"></ion-icon>
      <Routes>
        <Route
          path="/"
          element={
            <Products
              selectProductHandler={selectProductHandler}
              addToCart={addToCart}
              products={products}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              decCartItems={decCartItems}
              incCartItems={incCartItems}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/product"
          element={<Product product={selectedProduct} />}
        />
      </Routes>
    </div>
  );
}

export default App;
