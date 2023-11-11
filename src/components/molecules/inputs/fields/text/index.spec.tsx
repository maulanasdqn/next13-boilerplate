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

  it("Should have size sm", () => {
    const { getByTestId } = render(<TextField variant="sm" />);
    expect(getByTestId("text-field")).toHaveClass("text-sm");
  });

  it("Should have size md", () => {
    const { getByTestId } = render(<TextField variant="md" />);
    expect(getByTestId("text-field")).toHaveClass("text-base");
  });

  it("Should have size lg", () => {
    const { getByTestId } = render(<TextField variant="lg" />);
    expect(getByTestId("text-field")).toHaveClass("text-lg");
  });

  it("Should have readOnly", () => {
    const { getByTestId } = render(<TextField readOnly />);
    expect(getByTestId("text-field")).toHaveAttribute("readOnly");
  });

  it("Should have spellCheck", () => {
    const { getByTestId } = render(<TextField spellCheck />);
    expect(getByTestId("text-field")).toHaveAttribute("spellcheck", "true");
  });

  it("Should have autoComplete", () => {
    const { getByTestId } = render(<TextField autoComplete="on" />);
    expect(getByTestId("text-field")).toHaveAttribute("autocomplete", "on");
  });

  it("Should have autoCapitalize", () => {
    const { getByTestId } = render(<TextField autoCapitalize="on" />);
    expect(getByTestId("text-field")).toHaveAttribute("autocapitalize", "on");
  });

  it("Should have autoCorrect", () => {
    const { getByTestId } = render(<TextField autoCorrect="on" />);
    expect(getByTestId("text-field")).toHaveAttribute("autocorrect", "on");
  });

  it("Should have autoSave", () => {
    const { getByTestId } = render(<TextField autoSave="on" />);
    expect(getByTestId("text-field")).toHaveAttribute("autosave", "on");
  });

  it("Should have inputMode", () => {
    const { getByTestId } = render(<TextField inputMode="search" />);
    expect(getByTestId("text-field")).toHaveAttribute("inputmode", "search");
  });

  it("Should have accept", () => {
    const { getByTestId } = render(<TextField accept="image/*" />);
    expect(getByTestId("text-field")).toHaveAttribute("accept", "image/*");
  });

  it("Should have maxLength", () => {
    const { getByTestId } = render(<TextField maxLength={10} />);
    expect(getByTestId("text-field")).toHaveAttribute("maxlength", "10");
  });

  it("Should have minLength", () => {
    const { getByTestId } = render(<TextField minLength={10} />);
    expect(getByTestId("text-field")).toHaveAttribute("minlength", "10");
  });

  it("Should have status success", () => {
    const { getByTestId } = render(<TextField status="success" />);
    expect(getByTestId("text-field")).toHaveAttribute("status", "success");
  });

  it("Should have status error", () => {
    const { getByTestId } = render(<TextField status="error" />);
    expect(getByTestId("text-field")).toHaveAttribute("status", "error");
  });

  it("Should have status warning", () => {
    const { getByTestId } = render(<TextField status="warning" />);
    expect(getByTestId("text-field")).toHaveAttribute("status", "warning");
  });
});
