import React from 'react'
import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import Herosection from './Herosection'
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
  return (
    <div>
        <Herosection 
        title="Buy iphone 14 Pro Max" 
        subtible="Experience the power of the latest iphone 15 with new features and updates"
        image={iphone}
        link='/products/666263f297422d19c9a02acd'
        />
        <FeaturedProducts />
        <Herosection 
        title="Buy Macbook Pro" 
        subtible="Macbook elite and profession"
        image={mac}
        link='/products/666263f297422d19c9a02ad5'
        />
    </div>
  )
}

export default HomePage