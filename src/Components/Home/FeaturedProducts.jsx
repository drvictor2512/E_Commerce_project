import React from 'react'
import './FeaturedProducts.css'
import ProductCard from '../Products/ProductCard'
import useData from './../../hooks/useData';
import ProductLoading from '../Products/ProductLoading';
const FeaturedProducts = () => {
  const {data, isLoading, errors} = useData('/products/featured')
  const n = [1, 2, 3];
  return (
    <section className="featureproducts">
        <h2>Featured Products</h2>
        <div className="align_center featuredroductslist">
        {errors && <em className='form_error'>{errors}</em>}
          {
            data &&data.map(product => <ProductCard key={product._id} product={product}/>)
          }
          {isLoading && n.map((i) => <ProductLoading key={i}/>)}
        </div>
    </section>
  )
}

export default FeaturedProducts