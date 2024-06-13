import React from 'react'
import './Linkswithicon.css'
import { NavLink } from 'react-router-dom'
const Linkswithicon = ({title, link, emoji, sidebar}) => {
  return (
    <NavLink to={link} className={sidebar ? 'align_center sidebar_links' : 'align_center' }>{title} <img src={emoji} className='links_emoji'/></NavLink>
  )
}

export default Linkswithicon