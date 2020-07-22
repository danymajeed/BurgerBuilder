import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import axiosInstance from "../../axiosOrders";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    if (!this.props.isBuilding) this.props.initializeIngredients();
  }

  continueToCheckout = () => {
    this.props.initPurchase();
    this.props.history.push("/checkout");
  };

  updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientType) => {
        return ingredients[ingredientType];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  updatePurchasingState = () => {
    if (this.props.isAuthenticated) {
      const oldPurchasingStatus = this.state.purchasing;
      const newPurchasingState = !oldPurchasingStatus;
      this.setState({ purchasing: newPurchasingState });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;

    let burger = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        {this.props.error ? (
          <h2>App cannot be loaded, Sorry! </h2>
        ) : (
          <Spinner />
        )}
      </div>
    );

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disable={disabledInfo}
            purchasable={this.updatePurchasableState(this.props.ingredients)}
            purchasing={this.updatePurchasingState}
            isAuthenticated={this.props.isAuthenticated}
            price={this.props.totalPrice}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          closeModal={this.updatePurchasingState}
          continueToCheckout={this.continueToCheckout}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <React.Fragment>
        <ErrorHandler axios={axiosInstance}>
          {this.state.purchasing ? (
            <Modal
              show={this.state.purchasing}
              closeModal={this.updatePurchasingState}
            >
              {orderSummary}
            </Modal>
          ) : null}
          {burger}
        </ErrorHandler>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
    isBuilding: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    initializeIngredients: () => dispatch(actions.initializeIngredients()),
    initPurchase: () => dispatch(actions.initPurchase()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
