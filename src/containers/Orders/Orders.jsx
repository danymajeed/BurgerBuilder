import React, { Component } from "react";
import axiosInstance from "../../axiosOrders";
import Order from "../../components/Order/CheckoutSummary/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as orderActions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    let orders = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner />
      </div>
    );

    if (!this.props.loading) {
      orders = this.props.orders.map((order, index) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            orderNo={index + 1}
          />
        );
      });
    }

    return <ErrorHandler axios={axiosInstance}>{orders}</ErrorHandler>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    fetchOrders: () => dispath(orderActions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
