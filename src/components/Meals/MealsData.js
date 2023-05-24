import classes from "./MealsData.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setErrorMsg(null);
      const respon = await fetch(
        "https://food-order-app-af3e1-default-rtdb.firebaseio.com/meals.json"
      );
      if (!respon.ok) {
        throw new Error("Failed to get data , Try Again.");
      }
      const data = await respon.json();
      let loadedData = [];
      for (let key in data) {
        loadedData.push({ id: key, ...data[key] });
      }
      setMealsData(loadedData);
      setIsLoad(false);
    };

    fetchData().catch((error) => {
      setIsLoad(false);
      setErrorMsg(error.message);
    });
  }, []);

  const meals = mealsData.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      description={meal.description}
      name={meal.name}
      price={meal.price}
    />
  ));

  // if (errorMsg) {
  //   return (
  //     <section>
  //       <h1>{errorMsg}</h1>
  //     </section>
  //   );
  // }

  const checkError = errorMsg && (
    <div className={classes["error-message"]}>
      <h1>{errorMsg}</h1>
    </div>
  );
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {isLoad && <p className={classes.loading}>Loading...</p>}
          {!isLoad && meals}
          {checkError}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
