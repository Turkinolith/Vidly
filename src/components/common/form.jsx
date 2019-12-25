import React, { Component } from "react";
import Input from "./input";
import Joi from "@hapi/joi";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const localSchema = Joi.object(this.schema);
    const validateOption = { abortEarly: false };
    const { error } = localSchema.validate(this.state.data, validateOption);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const localSchema = Joi.object({ [name]: this.schema[name] });
    const { error } = localSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = event => {
    //Prevent default behavior of submitting a form.
    event.preventDefault();
    // Run form validation. If errors exist, return errors, otherwise set errors to empty object and continue and run doSubmit()
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    console.log("Form.jsx Render validate test:", this.validate());
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
