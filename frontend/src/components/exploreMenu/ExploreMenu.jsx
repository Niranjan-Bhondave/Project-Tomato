import React from 'react'
import './exploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1>Explore our menu</h1>
      <p className='exploreMenuText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, fuga nostrum numquam unde magni quod error tempore eum sunt sequi!</p>
      <div className="exploreMenuList">
        {
            menu_list.map((item, index) => {
                return(
                    <div onClick={() =>setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key = {index} className='exploreMenuListItem'>
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })            
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
