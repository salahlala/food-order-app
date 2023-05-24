import classes from "../Cart/Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSubmit, setOrderSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const contextLength = cartContext.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const handleOrder = async (userData) => {
    setOrderSubmit(true);
    const mealsItems = cartContext.items;
    const addOrder = async () => {
      await fetch(
        "https://food-order-app-af3e1-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            orderItems: mealsItems,
            userData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    addOrder().then(() => {
      setOrderLoading(true);
      setOrderSubmit(false);
      cartContext.clearCartHandler();
    });
  };

  const handleClickCheckout = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            amount={item.amount}
            price={item.price}
            name={item.name}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {contextLength && (
        <button className={classes.button} onClick={handleClickCheckout}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmitingData = (
    <p className={classes["submit-text"]}>Sending order data...</p>
  );

  const didSubmitingContext = (
    <div className={`${classes.actions} ${classes.submit}`}>
      <p className={`${classes["submit-text"]} ${classes.success}`}>
        Successfully sent the order! sent the order!
      </p>
      <button onClick={props.onClose} className={classes["button-alt"]}>
        Close
      </button>
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount: </span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onClose={props.onClose} sendUserData={handleOrder} />
      )}

      {!isCheckout && modalAction}
    </>
  );

  return (
    <Modal onClick={props.onClose}>
      {!orderLoading && !orderSubmit && modalContent}
      {orderSubmit && !orderLoading && isSubmitingData}
      {orderLoading && !orderSubmit && didSubmitingContext}
    </Modal>
  );
};

export default Cart;
