import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input
        name="title"
        id="title"
        value={title}
        placeholder="Write your poll title"
        onChange={handleChange}
        invalid={errors.title ? true : false}
      />
      {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input
        type="textarea"
        name="description"
        id="description"
        value={description}
        placeholder="Describe your poll"
        onChange={handleChange}
        invalid={errors.description ? true : false}
      />
      {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
    </FormGroup>
    <FormGroup>
      <Label>
        Enter Options
        <span
          className="bg-info text-white p-2 ml-3"
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={createOption}
        >
          Add Option
        </span>
      </Label>
      {options.map((opt, index) => (
        <div key={opt.id} className="d-flex my-2">
          <Input
            value={opt.value}
            onChange={(e) => handleOptionChange(e, index)}
            invalid={errors.options && errors.options[index] ? true : false}
          />
          <Button
            color="danger"
            disabled={options.length <= 2}
            className="ml-2"
            onClick={() => deleteOption(index)}
          >
            Delete
          </Button>
        </div>
      ))}
    </FormGroup>
    <Button color="primary" type="submit">
      {buttonValue}
    </Button>
  </Form>
);

export default MyForm;
