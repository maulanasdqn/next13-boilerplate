import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Fieldset } from "./";
import { test, expect } from "vitest";

test("Fieldset renders correctly with checkbox type", () => {
  const props = {
    type: "checkbox",
    label: "Checkbox Label",
    name: "checkboxField",
    children: <input type="checkbox" name="checkboxField" id="checkboxField" />,
    message: "Error message",
    hint: "Hint message",
  };

  render(<Fieldset status="error" {...props} />);

  expect(screen.getByLabelText("Checkbox Label")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
  expect(screen.getByText("Error message")).toBeInTheDocument();
  expect(screen.getByText("*Hint message")).toBeInTheDocument();
});

test("Fieldset renders correctly with radio type", () => {
  const props = {
    type: "radio",
    label: "Radio Label",
    name: "radioField",
    children: [<input id="radioField" name="radio" key="option1" type="radio" value="option1" />],
    message: "Error message",
    hint: "Hint message",
  };

  render(<Fieldset status="error" {...props} />);
  expect(screen.getByLabelText("Radio Label")).toBeInTheDocument();
  expect(screen.getByText("Error message")).toBeInTheDocument();
  expect(screen.getByText("*Hint message")).toBeInTheDocument();
});
