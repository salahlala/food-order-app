import classes from "./HeaderButton.module.css";
import CartContext from "../../Store/cart-context";
import { useContext, useEffect, useState } from "react";
const HeaderButton = (props) => {
  const ctx = useContext(CartContext);
  const [showAnimate, setShowAnimate] = useState(false);

  const { items } = ctx;
  const amountItems = items.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const classesButton = `${classes.button} ${showAnimate && classes.bump}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setShowAnimate(true);

    const timer = setTimeout(() => {
      setShowAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={classesButton} onClick={props.onClick}>
      <span>Your Cart</span>
      <span className={classes.badge}>{amountItems}</span>
    </button>
  );
};

export default HeaderButton;
