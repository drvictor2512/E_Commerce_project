import React from 'react'
import './Herosection.css'
import { Link } from 'react-router-dom'
const Herosection = ({title, subtible, image, link}) => {
  return (
    <section className="hero_section">
        <div className="align_center">
            <h2 className="hero_title">{title}</h2>
            <p className="hero_subtitle">{subtible}</p>
            <Link to={link} className="hero_link">Buy now</Link>
        </div>
        <div className="align_center">
            <img src={image} className='hero_image' />
        </div>
    </section>
  )
}

export default Herosection