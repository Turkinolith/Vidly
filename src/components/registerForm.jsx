import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", nameuser: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "edu"] }
      })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    nameuser: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    // TODO: call the server, save the changes, and then redirect the user to a different page.
    console.log("Registration Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nameuser", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
