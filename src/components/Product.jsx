import React from 'react'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <div>
        <h2>{product.name} | {product.price}</h2>
        <img src={product.image_link} alt="" />
        <p>
            About: {product.description}
        </p>

        <Link to='/'><button>Home</button></Link>

    </div>
  )
}

export default Product