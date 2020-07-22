import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";
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
        <Toolbar
          showSidedrawer={this.sidedrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Sidedrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.showSidedrawer}
          closeSidedrawer={this.sidedrawerHandler}
        />
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
