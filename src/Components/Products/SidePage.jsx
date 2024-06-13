import React from 'react'
import './SidePage.css'
import Linkswithicon from './../Navbar/Linkswithicon';
import useData from '../../hooks/useData';
const SidePage = () => {
  const {data : categories, errors} = useData('/category')
  return (
    <aside className="product_side_bar">
        <h2>Category</h2>
        <div className="category_links">
            {errors && <em className='form_error'>{errors}</em>}
            {categories && categories.map(category => <Linkswithicon key={category._id} id={category._id} title={category.name} link={`/products?category=${category.name}`} emoji={`http://localhost:5000/category/${category.image}`} sidebar={true}/>)}
            
        </div>
    </aside>
  )
}

export default SidePage