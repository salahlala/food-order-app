import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultItems = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exisitingIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exitsitingCartItems = state.items[exisitingIndex];

    let updateItems;

    if (exitsitingCartItems) {
      const updateItem = {
        ...exitsitingCartItems,
        amount: exitsitingCartItems.amount + action.item.amount,
      };

      updateItems = [...state.items];
      updateItems[exisitingIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const exisitingIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exitsitingItems = state.items[exisitingIndex];
    const updatedTotalAmount = state.totalAmount - exitsitingItems.price;
    let updateItems;

    if (exitsitingItems.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exitsitingItems,
        amount: exitsitingItems.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[exisitingIndex] = updatedItem;
    }

    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultItems;
  }

  return defaultItems;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultItems);

  const addItemCart = async (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemCart = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCart,
    removeItem: removeItemCart,
    clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
