import { fireEvent, render } from "@testing-library/react";
import { CheckBoxField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test CheckBoxField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<CheckBoxField />);
    expect(getByTestId("checkbox-field")).toBeInTheDocument();
  });

  it("Should be checked", () => {
    const { getByTestId } = render(<CheckBoxField />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).toBeChecked();
  });

  it("Should be not checked", () => {
    const { getByTestId } = render(<CheckBoxField checked={false} defaultChecked={false} />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).not.toBeChecked();
  });

  it("Should be disabled", () => {
    const { getByTestId } = render(<CheckBoxField disabled />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).toBeDisabled();
  });

  it("Should be not disabled", () => {
    const { getByTestId } = render(<CheckBoxField disabled={false} />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).not.toBeDisabled();
  });

  it("Should be required", () => {
    const { getByTestId } = render(<CheckBoxField required />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).toBeRequired();
  });

  it("Should be not required", () => {
    const { getByTestId } = render(<CheckBoxField required={false} />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).not.toBeRequired();
  });

  it("Should be readOnly", () => {
    const { getByTestId } = render(<CheckBoxField readOnly />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).toHaveAttribute("readonly");
  });

  it("Should be not readOnly", () => {
    const { getByTestId } = render(<CheckBoxField readOnly={false} />);
    fireEvent.click(getByTestId("checkbox-field"));
    expect(getByTestId("checkbox-field")).not.toHaveAttribute("readonly");
  });

  it("Should have id", () => {
    const { getByTestId } = render(<CheckBoxField id="test" />);
    expect(getByTestId("checkbox-field")).toHaveAttribute("id", "test");
  });

  it("Should have name", () => {
    const { getByTestId } = render(<CheckBoxField name="test" />);
    expect(getByTestId("checkbox-field")).toHaveAttribute("name", "test");
  });

  it("Should have value", () => {
    const { getByTestId } = render(<CheckBoxField value="test" />);
    expect(getByTestId("checkbox-field")).toHaveAttribute("value", "test");
  });
});
