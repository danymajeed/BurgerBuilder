import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sidedrawerHandler = () => {
    const oldVal = this.state.showSidedrawer;
    const newVal = !oldVal;
    this.setState({ showSidedrawer: newVal });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar showSidedrawer={this.sidedrawerHandler} />
        <Sidedrawer
          show={this.state.showSidedrawer}
          closeSidedrawer={this.sidedrawerHandler}
        />
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
