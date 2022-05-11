import React from 'react'
import fruit_lemon from './img/fruit_lemon.png'
import sryles from './fruit.module.css'

const Fruit = () => {
 // console.log('FFFFFFruit')
  return (
    <div>
      <img alt='dd' className={sryles.fruit} src={fruit_lemon}/>
    </div>
  )
}

export default Fruit
