import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealsItemForm = (props) => {
  const inputRef = useRef();
  const [formValid, setFormValid] = useState(true);
  const submitFormHandler = (event) => {
    event.preventDefault();

    const amountInput = inputRef.current.value;

    const amountNumber = +amountInput;

    if (
      amountNumber < 1 ||
      amountNumber > 5 ||
      amountInput.trim().length === 0
    ) {
      setFormValid(false);
      return;
    }

    props.onAddToCart(amountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!formValid && <p>Enter Amount [1-5]</p>}
    </form>
  );
};

export default MealsItemForm;
