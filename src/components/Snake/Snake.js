import React, { useEffect, useRef } from 'react'
import snake_golova from './img/snake_golova.png'
import styles from './snake.module.css'

const Snake = () => {

  return (
     <div >
      <img alt='ss' className={styles.snake_golova} src={snake_golova}/>
    </div>
  )
}

export default Snake

