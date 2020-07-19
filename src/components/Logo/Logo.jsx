import React from "react";
import classes from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img className="h-100" src={burgerLogo} alt="My Burger"></img>
    </div>
  );
};

export default Logo;
