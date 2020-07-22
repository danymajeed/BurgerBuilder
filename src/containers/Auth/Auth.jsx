import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import checkValidity from "../../shared/Functions/FormValidity";

class Auth extends Component {
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/")
      this.props.setAuthRedirectPath();
  }
  state = {
    isSignIn: true,
    authForm: {
      email: {
        elementType: "input",
        label: "Email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        label: "Password",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
          autoComplete: "on",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    loading: false,
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.authForm,
    };
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    this.setState({ authForm: updatedAuthForm });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignIn
    );
  };

  changeSignInHandler = () => {
    const newState = !this.state.isSignIn;
    this.setState({ isSignIn: newState });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }

    const errorMessage = this.props.error ? (
      <p className={classes.ErrorMessage}>
        {this.props.error.message.replace("_", " ")}
      </p>
    ) : null;

    let form = (
      <div className={classes.AuthForm}>
        <h4>Enter your Details</h4>
        <hr />
        <form onSubmit={this.onSubmitForm}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              label={formElement.config.label}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
          {errorMessage}
          <Button btnType="Success">
            {this.state.isSignIn ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.changeSignInHandler}>
          {this.state.isSignIn
            ? "Create an account"
            : "Already have an account"}
        </Button>
      </div>
    );

    if (this.props.loading)
      form = (
        <div className={classes.CenterScreen}>
          <Spinner />
        </div>
      );
    if (this.props.authenticated)
      form = <Redirect to={this.props.authRedirectPath} />;

    return form;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(actions.auth(email, password, isSignIn)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
