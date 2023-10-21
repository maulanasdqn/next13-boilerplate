import { fireEvent, render } from "@testing-library/react";
import { TextField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test TextField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<TextField />);
    expect(getByTestId("text-field")).toBeInTheDocument();
  });

  it("Should have type text", () => {
    const { getByTestId } = render(<TextField type="text" />);
    expect(getByTestId("text-field")).toHaveAttribute("type", "text");
  });

  it("Should have type password", () => {
    const { getByTestId } = render(<TextField type="password" />);
    expect(getByTestId("text-field")).toHaveAttribute("type", "password");
  });

  it("Should have type email", () => {
    const { getByTestId } = render(<TextField type="email" />);
    expect(getByTestId("text-field")).toHaveAttribute("type", "email");
  });

  it("Should have type number", () => {
    const { getByTestId } = render(<TextField type="number" />);
    expect(getByTestId("text-field")).toHaveAttribute("type", "number");
  });

  it("Should have placeholder", () => {
    const { getByTestId } = render(<TextField placeholder="Placeholder" />);
    expect(getByTestId("text-field")).toHaveAttribute("placeholder", "Placeholder");
  });

  it("Should have value", () => {
    const { getByTestId } = render(<TextField value="Value" />);
    expect(getByTestId("text-field")).toHaveAttribute("value", "Value");
  });

  it("Should have onChange", () => {
    const onChangeFn = vi.fn();
    const { getByTestId } = render(<TextField onChange={onChangeFn} />);
    fireEvent.change(getByTestId("text-field"), { target: { value: "Value" } });
    expect(onChangeFn).toHaveBeenCalled();
  });

  it("Should have onBlur", () => {
    const onBlurFn = vi.fn();
    const { getByTestId } = render(<TextField onBlur={onBlurFn} />);
    fireEvent.blur(getByTestId("text-field"));
    expect(onBlurFn).toHaveBeenCalled();
  });

  it("Should have onFocus", () => {
    const onFocusFn = vi.fn();
    const { getByTestId } = render(<TextField onFocus={onFocusFn} />);
    fireEvent.focus(getByTestId("text-field"));
    expect(onFocusFn).toHaveBeenCalled();
  });

  it("Should have disabled", () => {
    const { getByTestId } = render(<TextField disabled />);
    expect(getByTestId("text-field")).toBeDisabled();
  });

  it("Should have required", () => {
    const { getByTestId } = render(<TextField required />);
    expect(getByTestId("text-field")).toBeRequired();
  });

  it("Should have className", () => {
    const { getByTestId } = render(<TextField className="className" />);
    expect(getByTestId("text-field")).toHaveClass("className");
  });

  it("Should have size sm", () => {
    const { getByTestId } = render(<TextField size="sm" />);
    expect(getByTestId("text-field")).toHaveClass("text-sm");
  });

  it("Should have size md", () => {
    const { getByTestId } = render(<TextField size="md" />);
    expect(getByTestId("text-field")).toHaveClass("text-base");
  });

  it("Should have size lg", () => {
    const { getByTestId } = render(<TextField size="lg" />);
    expect(getByTestId("text-field")).toHaveClass("text-lg");
  });

  it("Should have readOnly", () => {
    const { getByTestId } = render(<TextField readOnly />);
    expect(getByTestId("text-field")).toHaveAttribute("readOnly");
  });
});
