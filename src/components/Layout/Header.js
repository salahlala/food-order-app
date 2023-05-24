import classes from "./Header.module.css";
import HeaderButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <h1>ReactMeals</h1>
          <HeaderButton onClick={props.onClick} />
        </div>
      </header>
    </>
  );
};

export default Header;
