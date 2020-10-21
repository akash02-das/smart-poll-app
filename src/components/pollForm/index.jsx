import React from "react";
import shortid from "shortid";

import Form from "./form";
import swal from "sweetalert";

const defaultOptions = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];

class PollForm extends React.Component {
  state = {
    title: "",
    description: "",
    options: defaultOptions,
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOptionChange = (event, index) => {
    const { options } = this.state;
    options[index].value = event.target.value;

    this.setState({ options });
  };

  createOption = () => {
    const { options } = this.state;

    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      this.setState({ options });
    } else {
      //   alert("You can create maximum 5 options");
      swal("Alert!", "You can create maximum 5 options!", "warning");
    }
  };

  deleteOption = (index) => {
    const { options } = this.state;

    if (options.length > 2) {
      options.splice(index, 1);
      this.setState({ options });
    } else {
      //   alert("You must have at least 2 options");
      swal("Alert!", "You must have at least 2 options!", "warning");
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors } = this.validate();

    if (isValid) {
      const { title, description, options } = this.state;
      this.props.submit({ title, description, options });

      event.target.reset();
      this.setState({
        title: "",
        description: "",
        options: defaultOptions,
        errors: {},
      });
      //   alert("Poll created successfully!");
      swal("Good job!", "Poll created successfully!", "success");
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { title, description, options } = this.state;

    if (!title) {
      errors.title = "Please provide a title";
    } else if (title.length < 20) {
      errors.title = "Your title is too short";
    } else if (title.length > 100) {
      errors.title = "Your title is too long";
    }

    if (!description) {
      errors.description = "Please provide a description";
    } else if (description.length > 500) {
      errors.description = "Your description is too long";
    }

    const optionErrors = [];
    options.forEach((opt, index) => {
      if (!opt.value) {
        optionErrors[index] = "Option text is empty";
      } else if (opt.value.length > 100) {
        optionErrors[index] = "Option text is too long";
      }
    });

    if (optionErrors.length > 0) {
      errors.options = optionErrors;
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    const { title, description, options, errors } = this.state;
    return (
      <Form
        title={title}
        description={description}
        options={options}
        errors={errors}
        buttonValue={this.props.buttonValue || "Create Poll"}
        handleChange={this.handleChange}
        handleOptionChange={this.handleOptionChange}
        createOption={this.createOption}
        deleteOption={this.deleteOption}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default PollForm;
