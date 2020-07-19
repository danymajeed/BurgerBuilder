import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SidedrawerToggle from "../Sidedrawer/SidedrawerToggle/SidedrawerToggle";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <SidedrawerToggle clicked={props.showSidedrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
