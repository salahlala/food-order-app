import { useReducer } from "react";

const initialValues = {
  value: "",
  isTouched: false,
};

const iunputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  return initialValues;
};

const useForm = (validate) => {
  const [inputState, dispatch] = useReducer(iunputReducer, initialValues);

  const inputValid = validate(inputState.value);
  const checkValid = !inputValid && inputState.isTouched;

  const handleInputBlur = () => {
    dispatch({ type: "BLUR" });
  };
  const handleInputChange = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  return {
    inputValue: inputState.value,
    inputValid,
    checkValid,
    handleInputBlur,
    handleInputChange,
  };
};

export default useForm;
