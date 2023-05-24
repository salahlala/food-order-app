import classes from "../MealItem/MealItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../Store/cart-context";
import { useContext } from "react";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const contextItems = useContext(CartContext);
  const addItemToCart = (amount) => {
    contextItems.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm id={props.id} onAddToCart={addItemToCart} />
      </div>
    </li>
  );
};

export default MealItem;
