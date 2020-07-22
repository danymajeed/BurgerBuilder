import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  goBackHandler = () => {
    this.props.history.goBack();
  };

  goForwardHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const ContactData = lazy(() =>
      import("../Checkout/ContactData/ContactData")
    );

    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            goBack={this.goBackHandler}
            goForward={this.goForwardHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <ContactData />
              </Suspense>
            )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
