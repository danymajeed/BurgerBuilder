import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Build Burger
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Sign in</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
