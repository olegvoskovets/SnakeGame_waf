import React from "react";
import Field from "../Field/Field";
import styles from "./container.module.css";

const Container = ({ pole,fruit,snake,body_snake }) => {
  const drawCals = () => {
    const p = [];
    let k=0
    for (let i = 0; i < pole.row ; i++) {
      for (let j =0 ;j < pole.col ; j++) {
        k++
        
        p.push(<Field classis={(i+j)%2==0?'class1':'class2'} body_snake={body_snake} snake={snake} fruit={fruit} xPole={j} yPole={i} key={k}></Field>);
      }
    }
    return p
  };

  return <div className={styles.container}>{drawCals()}</div>;
};

export default Container;
