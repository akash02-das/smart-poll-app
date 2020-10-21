import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  CustomInput,
  Label,
  Button,
} from "reactstrap";

class ParticipationForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors, isValid } = this.validate();

    if (isValid) {
      const { name, selectedOption } = this.state;

      this.props.getOpinion({
        pollId: this.props.poll.id,
        name,
        selectedOption,
      });

      event.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { name, selectedOption } = this.state;

    if (!name) {
      errors.name = "Please provide your name";
    } else if (name.length > 20) {
      errors.name = "Name is too long";
    }

    if (!selectedOption) {
      errors.selectedOption = "Please select one option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            type="button"
            color="warning"
            className="ml-auto"
            onClick={this.props.toggleModal}
          >
            Edit
          </Button>
          <Button
            type="button"
            color="danger"
            className="ml-2"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>
        {this.props.poll.options.map((opt) => (
          <FormGroup className="my-2" key={opt.id}>
            <Label className="d-flex">
              <CustomInput
                type="radio"
                id={opt.id}
                name="selectedOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.errors.selectedOption ? true : false}
              />
              {opt.value}
              <span
                className="ml-auto bg-info text-white"
                style={{ padding: "5px 20px", borderRadius: "5px" }}
              >
                {opt.vote}
              </span>
              <span
                className="ml-2 bg-success text-white"
                style={{ padding: "5px 20px", borderRadius: "5px" }}
              >
                {this.props.poll.totalVote > 0
                  ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                  : 0}
                %
              </span>
            </Label>
          </FormGroup>
        ))}
        <FormGroup className="my-3">
          <Label>Enter Your Name</Label>
          <Input
            name="name"
            placeholder="Your name"
            value={this.state.value}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit" className="bg-success">
          Submit Your Opinion
        </Button>
      </Form>
    );
  }
}

export default ParticipationForm;
