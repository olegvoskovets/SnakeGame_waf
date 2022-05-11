import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "./components/Container/Container";
import styles from "./app.module.css";
import useKeypress from "react-use-keypress";

const MOVING_UP = "MOVING_UP";
const MOVING_DOWN = "MOVING_DOWN";
const MOVING_RIGHT = "MOVING_RIGHT";
const MOVING_LEFT = "MOVING_LEFT";

function App() {
  const pole = {
    col: 20,
    row: 20,
  };

  const initialFruit = {
    x: Math.floor(Math.random() * pole.col),
    y: Math.floor(Math.random() * pole.row),
  };

  const initialSnake = [
    {
      x: Math.floor(Math.random() * pole.col),
      y: Math.floor(Math.random() * pole.row),
    },
  ];

  const [fruit, setFruit] = useState(initialFruit);
  const [snake, setSnake] = useState(initialSnake);
  const [body_snake, setBody_snake] = useState([]); //тело червяка

  //после поедания у нас виросло тело поєтому шаг не делаем false запрещает шагать
  //значит ми поели и автоматом у нас увеличилось тело
  // const [step_to_do, setStepTodo] = useState(true); //будем ли т

  const [count, setCount] = useState(0);
  const [start, setStart] = useState(true); // игра продолжается

  const [delay, setDelay] = useState(400); //интервал шага змейки
  const [time, setTime] = useState(0); // время игри общее
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [fihish, setFinish] = useState(false);

  const quickenYourPace = (i) => {
    if (i == 5) {
      setDelay(delay - 50);
    }
    if (i == 10) {
      setDelay(delay - 50);
    }
    if (i == 15) {
      setDelay(delay - 50);
    }
    if (i == 20) {
      setDelay(delay - 30);
    }
    if (i == 25) {
      setDelay(delay - 30);
    }
    if (i == 30) {
      setDelay(delay - 20);
    }
    if (i == 35) {
      setDelay(delay - 20);
    }
    if (i == 40) {
      setDelay(delay - 20);
    }
    if (i == 45) {
      setDelay(delay - 15);
    }
  };

  // а не сьели ли мі еду
  const ateFood = useCallback((predXY) => {
    if (fruit.x === snake[0].x && fruit.y === snake[0].y) {
      //значит еду сьели нужна новая еда и отстроить тело
      // змеи и подсчитать количество еди

      setCount(count + 1);
      //возможно пора увеличить скорость игрі
      quickenYourPace(count);
      // новую еду давай
      //когда длинное тело еда не должна попасть на тело или голову

      newFruit();
      //строим тело червяка
      newBody_Snake(predXY.x, predXY.y);
    }
  });

  const newBody_Snake = (x, y) => {
    if (body_snake.length == 0) {
      setBody_snake([...body_snake, { x: x, y: y }]);
    } else {
      body_snake.unshift({ x: x, y: y });
    }
  };
  const new_XY = () => {
    let x = Math.floor(Math.random() * pole.col);
    let y = Math.floor(Math.random() * pole.row);
    var clone_Body = JSON.parse(JSON.stringify(body_snake));
    var clone_Snake = JSON.parse(JSON.stringify(snake));
    let c_body = clone_Body.filter((body) => body.x == x && body.y == y);
    let c_snake = clone_Snake.filter((snak) => snak.x == x && snak.y == y);
    if (c_body.length == 0 && c_snake.length == 0) {
      return { x: x, y: y };
    } else {
     // console.log("попал на тело или голову"); проверил работает
      return new_XY();
    }
  };

  const newFruit = useCallback(() => {
    //когда длинное тело еда не должна попасть на тело или голову
    setFruit({});

    // let x= Math.floor(Math.random() * pole.col);
    // let y=Math.floor(Math.random() * pole.row)
    let newXY = new_XY();
    setTimeout(() => {
      setFruit({
        ...fruit,
        x: newXY.x,
        y: newXY.y,
      });
    }, 300);
  });

  //проверяем віход за предел поля вверху
  const shockUp = (y) => {
    return y;
  };
  //проверяем віход за предел поля внізу
  const shockDown = (y) => {
    return y;
  };
  //проверяем віход за предел поля влево
  const shockLeft = (x) => {
    return x;
  };
  //проверяем віход за предел поля вправо
  const shockRight = (x) => {
    return x;
  };
  //========записіваем прошлі координ голови чт тіла
  const pred_XY = (x, y) => {
    return { x: x, y: y };
  };
  //определяем движение тела
  // в єтот момент нам надо последний єлемент тела удалить и в єто же время
  //добавить  на место голови новий кусочек тела а голова с вою очередь передвинется
  // на новое место. тело внутри змея не трогаем. получим передвижение тела
  const body_Movement = (x, y, body) => {
    if (body_snake.length == 1) {
      setBody_snake([{ x: x, y: y }]);
    } else {
      if (body && body_snake.length > 1) {
        //на цьому єтапе ми уже не сьели еду и ми двигаем тело за головой
        //просто последнее значение массива переставляем на координати голові
        body_snake.pop();
        body_snake.unshift({ x: x, y: y });
      }

      // }
    }
    //setBody_snake()
  };
  const Dvigaem_body = (x, y) => {
    //сравниваем увеличилось ли тело если нет то будем двигать

    if (x !== y) {
      return false;
    } else {
      return true;
    }
  };

  const head_Not_Body = (x, y) => {
    var clone_Body = JSON.parse(JSON.stringify(body_snake));

    let clone = clone_Body.filter(
      (item, i) => item.x == x && item.y == y && i !== 0
    );

    if (clone.length > 0) {
      //здесь надо создать модальное окно с результатом игри
      //игра окончена
      setStart(false);
      setFinish(true);
    }
  };
  const youCanMove = (x, y) => {
    if (body_snake.length > 0) {
      head_Not_Body(x, y);

      if (body_snake[0].x == x && body_snake[0].y == y) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const snake_Movement = (x, action) => {
    let body_staroe;
    let body_novoe;
    if (body_snake) {
      body_staroe = body_snake.length;
    }
    //setStepTodo(true);
    switch (action) {
      case MOVING_UP:
        if (x > 0) {
          const predXY = pred_XY(snake[0].x, snake[0].y);
          //проверяем не начали ли ми идти задом и запрещаем
          //здесь же проверим не наехали ми своей головой на тело

          var clone_Snake = JSON.parse(JSON.stringify(snake));

          let you_can_move = youCanMove(clone_Snake[0].x, --clone_Snake[0].y);

          if (you_can_move) {
            //флаг можно идти в єтом направлении
            setSnake([{ x: snake[0].x, y: --snake[0].y }]);
            //для достраивания тела если ми покушаем в єтот момент нам надо передать
            //в функцию поедания фрукта последнюю координат нашего тела червяка если оно
            //уже существует

            ateFood(predXY);
            if (body_snake) {
              body_novoe = body_snake.length;
            }
            let body = Dvigaem_body(body_novoe, body_staroe); // тогда тело будем двигать иначе оно поело и увеличилось само

            body_Movement(snake[0].x, ++snake[0].y, body);
          }
        }
        break;
      case MOVING_DOWN:
        if (x < pole.row - 1) {
          const predXY = pred_XY(snake[0].x, snake[0].y);
          //проверяем не начали ли ми идти задом и запрещаем

          var clone_Snake = JSON.parse(JSON.stringify(snake));

          let you_can_move = youCanMove(clone_Snake[0].x, ++clone_Snake[0].y);

          if (you_can_move) {
            setSnake([{ x: snake[0].x, y: ++snake[0].y }]);

            ateFood(predXY);
            if (body_snake) {
              body_novoe = body_snake.length;
            }
            let body = Dvigaem_body(body_novoe, body_staroe); // тогда тело будем двигать иначе оно поело и увеличилось само

            body_Movement(snake[0].x, --snake[0].y, body);
          }
        }
        break;
      case MOVING_LEFT:
        if (x > 0) {
          const predXY = pred_XY(snake[0].x, snake[0].y);
          //проверяем не начали ли ми идти задом и запрещаем

          var clone_Snake = JSON.parse(JSON.stringify(snake));

          let you_can_move = youCanMove(--clone_Snake[0].x, clone_Snake[0].y);

          if (you_can_move) {
            setSnake([{ x: --snake[0].x, y: snake[0].y }]);

            ateFood(predXY);
            if (body_snake) {
              body_novoe = body_snake.length;
            }
            let body = Dvigaem_body(body_novoe, body_staroe); // тогда тело будем двигать иначе оно поело и увеличилось само

            body_Movement(++snake[0].x, snake[0].y, body);
          }
        }
        break;
      case MOVING_RIGHT:
        if (x < pole.col - 1) {
          const predXY = pred_XY(snake[0].x, snake[0].y);
          //проверяем не начали ли ми идти задом и запрещаем

          var clone_Snake = JSON.parse(JSON.stringify(snake));

          let you_can_move = youCanMove(++clone_Snake[0].x, clone_Snake[0].y);

          if (you_can_move) {
            setSnake([{ x: ++snake[0].x, y: snake[0].y }]);
            ateFood(predXY);
            if (body_snake) {
              body_novoe = body_snake.length;
            }
            let body = Dvigaem_body(body_novoe, body_staroe); // тогда тело будем двигать иначе оно поело и увеличилось само

            body_Movement(--snake[0].x, snake[0].y, body);
          }
        }
        break;
      default:
        break;
    }
  };

  const movingUp = () => {
    if (start) {
      const y = shockUp(snake[0].y);
      snake_Movement(y, MOVING_UP);
    }
  };
  const movingDown = () => {
    if (start) {
      const y = shockDown(snake[0].y);
      snake_Movement(y, MOVING_DOWN);
    }
  };

  //движемся вправо
  const movingRight = () => {
    if (start) {
      const x = shockRight(snake[0].x);
      snake_Movement(x, MOVING_RIGHT);
    }
  };

  //движемяс влево
  const movingLeft = () => {
    if (start) {
      const x = shockLeft(snake[0].x);
      snake_Movement(x, MOVING_LEFT);
    }
  };

  //console.log("stsrt x=", snake[0].x, " y ", snake[0].y);

  const stopGame = () => {};
  const startStopGame = () => {
    setStart(!start);
  };

  useKeypress(["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], (e) => {
    switch (e.key) {
      case "ArrowDown":
        setArrowUp(false);
        setArrowLeft(false);
        setArrowRight(false);
        setArrowDown(true);
        // movingDown();
        break;
      case "ArrowUp":
        setArrowDown(false);
        setArrowLeft(false);
        setArrowRight(false);
        setArrowUp(true);
        // movingUp();
        break;
      case "ArrowLeft":
        setArrowDown(false);
        setArrowUp(false);
        setArrowRight(false);
        setArrowLeft(true);
        // movingLeft();
        break;
      case "ArrowRight":
        setArrowLeft(false);
        setArrowDown(false);
        setArrowUp(false);
        setArrowRight(true);
        //  movingRight();
        break;
    }
  });

  //============ИНТЕРВАЛ==========================
  //це я знайшов в інеті подібне роз'яснення для себе трохи переробив
  useInterval(
    () => {
      // Your custom logic here
      // вставить надо наше движение скорее всего по флагу
      if (arrowUp) {
        movingUp();
      }
      if (arrowDown) {
        movingDown();
      }
      if (arrowLeft) {
        movingLeft();
      }
      if (arrowRight) {
        movingRight();
      }
    },
    start ? delay : null
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div className={styles.app}>
      <input type="text" placeholder="Введите имя"></input>
      <Container
        pole={pole}
        fruit={fruit}
        snake={snake}
        body_snake={body_snake}
      />
      <div className={styles.btn}>
        <button onClick={movingUp}>Вверх</button>
        <button onClick={movingDown}>Вниз</button>
        <button onClick={movingRight}>Вправо</button>
        <button onClick={movingLeft}>Влево</button>

        <button onClick={startStopGame}>
          {start ? "START/stop" : "STOP/start"}
        </button>

        {count > 0 ? <h2>Я з'їв {count} шт</h2> : ""}
        <h3>Швидкість пересуванння: {delay} ms</h3>
        {fihish ? <h1 className="fihish">Гра скірчилась</h1> : null}
      </div>
    </div>
  );
}

export default App;
