import { fireEvent, render } from "@testing-library/react";
import { InputCheckbox } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test InputCheckbox Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<InputCheckbox readOnly />);
    expect(getByTestId("input-checkbox")).toBeInTheDocument();
  });

  it("Should be checked", () => {
    const { getByTestId } = render(<InputCheckbox readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).toBeChecked();
  });

  it("Should be not checked", () => {
    const { getByTestId } = render(<InputCheckbox checked={false} readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).not.toBeChecked();
  });

  it("Should be disabled", () => {
    const { getByTestId } = render(<InputCheckbox disabled readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).toBeDisabled();
  });

  it("Should be not disabled", () => {
    const { getByTestId } = render(<InputCheckbox disabled={false} readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).not.toBeDisabled();
  });

  it("Should be required", () => {
    const { getByTestId } = render(<InputCheckbox required readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).toBeRequired();
  });

  it("Should be not required", () => {
    const { getByTestId } = render(<InputCheckbox required={false} readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).not.toBeRequired();
  });

  it("Should be readOnly", () => {
    const { getByTestId } = render(<InputCheckbox readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).toHaveAttribute("readonly");
  });

  it("Should be not readOnly", () => {
    const { getByTestId } = render(<InputCheckbox readOnly={false} />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(getByTestId("input-checkbox")).not.toHaveAttribute("readonly");
  });

  it("Should have id", () => {
    const { getByTestId } = render(<InputCheckbox name="test" readOnly />);
    expect(getByTestId("input-checkbox")).toHaveAttribute("id", "test");
  });

  it("Should have name", () => {
    const { getByTestId } = render(<InputCheckbox name="test" readOnly />);
    expect(getByTestId("input-checkbox")).toHaveAttribute("name", "test");
  });

  it("Should have value", () => {
    const { getByTestId } = render(<InputCheckbox value="test" readOnly />);
    expect(getByTestId("input-checkbox")).toHaveAttribute("value", "test");
  });

  it("Should called onChange", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<InputCheckbox onChange={onChange} readOnly />);
    fireEvent.click(getByTestId("input-checkbox"));
    expect(onChange).toHaveBeenCalled();
  });
});
