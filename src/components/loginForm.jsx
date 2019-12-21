import React, { Component } from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // TODO: call the server, save the changes, and then redirect the user to a different page.
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
