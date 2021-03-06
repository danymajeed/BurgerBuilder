import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axiosOrders";

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

const purchaseBurgerSuccess = (order, id) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    order: order,
    orderId: id,
  };
};

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, idToken) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post("/orders.json?auth=" + idToken, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(orderData, response.data.name));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

const fetchedOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchedOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (idToken, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + idToken + '&orderBy="userId"&equalTo="' + userId + '"';
    axiosInstance
      .get("/orders.json" + queryParams)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchedOrdersSuccess(fetchedOrders));
      })
      .catch((error) => dispatch(fetchedOrdersFailed(error)));
  };
};
