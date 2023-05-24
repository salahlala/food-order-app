import useForm from "../../hooks/use-form";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    inputValue: nameInputValue,
    inputValid: nameValid,
    checkValid: checkNameValidation,
    handleInputBlur: handleNameBlur,
    handleInputChange: handleNameChange,
  } = useForm((value) => value.trim() !== "");

  const {
    inputValue: streetInputValue,
    inputValid: streetValid,
    checkValid: checkStreetValidation,
    handleInputBlur: handleStreetBlur,
    handleInputChange: handleStreetChange,
  } = useForm((value) => value.trim() !== "");

  const {
    inputValue: postalInputValue,
    inputValid: postalValid,
    checkValid: checkPostalValidation,
    handleInputBlur: handlePostalBlur,
    handleInputChange: handlePostalChange,
  } = useForm((value) => value.length > 1 && value.length < 6);

  const {
    inputValue: cityInputValue,
    inputValid: cityValid,
    checkValid: checkCityValidation,
    handleInputBlur: handleCityBlur,
    handleInputChange: handleCityChange,
  } = useForm((value) => value.trim() !== "");

  let formValid = false;
  if (nameValid && streetValid && postalValid && cityValid) {
    formValid = true;
  }

  const nameClass = checkNameValidation
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cityClass = checkCityValidation
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const postalClass = checkPostalValidation
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const streetClass = checkStreetValidation
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      name: nameInputValue,
      address: streetInputValue,
      postal: postalInputValue,
      city: cityInputValue,
    };

    props.sendUserData(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={nameInputValue}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        {checkNameValidation && (
          <p className={classes["error-text"]}>Please enter a valid name!</p>
        )}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={streetInputValue}
          onChange={handleStreetChange}
          onBlur={handleStreetBlur}
        />
        {checkStreetValidation && (
          <p className={classes["error-text"]}>Please enter a valid street!</p>
        )}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalInputValue}
          onChange={handlePostalChange}
          onBlur={handlePostalBlur}
        />
        {checkPostalValidation && (
          <p className={classes["error-text"]}>
            Please enter a valid postal code!
          </p>
        )}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityInputValue}
          onChange={handleCityChange}
          onBlur={handleCityBlur}
        />
        {checkCityValidation && (
          <p className={classes["error-text"]}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          type="button"
          onClick={props.onClose}
        >
          Cancel
        </button>
        <button className={classes.button} disabled={!formValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
