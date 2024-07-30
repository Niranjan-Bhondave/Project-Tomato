import React from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarOptions">
            <NavLink to='/add' className="sidebarOption">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>

            <NavLink to = '/list' className="sidebarOption">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>

            <NavLink to='/orders' className="sidebarOption">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
