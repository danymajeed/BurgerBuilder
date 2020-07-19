import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Sidedrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.closeSidedrawer} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </React.Fragment>
  );
};

export default Sidedrawer;
