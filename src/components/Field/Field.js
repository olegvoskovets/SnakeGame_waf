//import React, { forwardRef, useRef } from 'react'
import Body_Snake from "../Body_Snake/Body_Snake";
import Fruit from "../Fruit/Fruit";
import Snake from "../Snake/Snake";
import styles from "./field.module.css";

const Field = ({ xPole, yPole, classis, fruit, snake, body_snake }) => {
  const Body_Handler = () => {
    let bod = body_snake.find((body) => body.x == xPole && body.y == yPole)
      ? <Body_Snake/>
      : null;
    return bod;
  };
  return (
    <div
      className={
        classis && classis === "class1"
          ? styles.field
          : styles.field + " " + styles.class2
      }
    >
      {fruit.x === xPole && fruit.y === yPole ? <Fruit /> : ""}
      {snake[0].x === xPole && snake[0].y === yPole ? <Snake /> : ""}

      {body_snake[0] ? Body_Handler() : null}
    </div>
  );
};
//body_snake(xPole, yPole)   console.log("BODY ",body_snake[0].x, ' ', body_snake[0].y)
export default Field;
