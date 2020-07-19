import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

class ErrorHandler extends Component {
  state = {
    error: null,
  };

  componentDidMount() {
    this.reqInterceptor = this.props.axios.interceptors.request.use((req) => {
      this.setState({ error: null });
      return req;
    });

    this.resInterceptor = this.props.axios.interceptors.response.use(
      (res) => res,
      (error) => {
        this.setState({ error: error });
      }
    );
  }

  componentWillUnmount() {
    this.props.axios.interceptors.request.eject(this.reqInterceptor);
    this.props.axios.interceptors.response.eject(this.resInterceptor);
  }

  errorConfirmedHandler = () => {
    this.setState({ error: null });
  };
  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
          <strong>{this.state.error ? this.state.error.message : null}</strong>
        </Modal>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default ErrorHandler;
