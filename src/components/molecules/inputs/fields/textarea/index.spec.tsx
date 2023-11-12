import { fireEvent, render } from "@testing-library/react";
import { TextAreaField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test TextAreaField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<TextAreaField />);
    expect(getByTestId("textarea-field")).toBeInTheDocument();
  });

  it("Should render correctly with props", () => {
    const { getByTestId } = render(<TextAreaField data-testid="textarea-field" />);
    expect(getByTestId("textarea-field")).toBeInTheDocument();
  });

  it("Should render correctly with value", () => {
    const { getByTestId } = render(<TextAreaField value="test" />);
    expect(getByTestId("textarea-field")).toHaveValue("test");
  });

  it("Should render correctly with placeholder", () => {
    const { getByTestId } = render(<TextAreaField placeholder="test" />);
    expect(getByTestId("textarea-field")).toHaveAttribute("placeholder", "test");
  });

  it("Should render correctly with name", () => {
    const { getByTestId } = render(<TextAreaField name="test" />);
    expect(getByTestId("textarea-field")).toHaveAttribute("name", "test");
  });

  it("Should render correctly with id", () => {
    const { getByTestId } = render(<TextAreaField id="test" />);
    expect(getByTestId("textarea-field")).toHaveAttribute("id", "test");
  });

  it("Should render correctly with onChange", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<TextAreaField onChange={onChange} />);
    fireEvent.change(getByTestId("textarea-field"), { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("Should render correctly with onBlur", () => {
    const onBlur = vi.fn();
    const { getByTestId } = render(<TextAreaField onBlur={onBlur} />);
    fireEvent.blur(getByTestId("textarea-field"));
    expect(onBlur).toHaveBeenCalled();
  });

  it("Should render correctly with onFocus", () => {
    const onFocus = vi.fn();
    const { getByTestId } = render(<TextAreaField onFocus={onFocus} />);
    fireEvent.focus(getByTestId("textarea-field"));
    expect(onFocus).toHaveBeenCalled();
  });

  it("Should render correctly with disabled", () => {
    const { getByTestId } = render(<TextAreaField disabled />);
    expect(getByTestId("textarea-field")).toBeDisabled();
  });

  it("Should render correctly with required", () => {
    const { getByTestId } = render(<TextAreaField required />);
    expect(getByTestId("textarea-field")).toBeRequired();
  });

  it("Should render correctly with style", () => {
    const { getByTestId } = render(<TextAreaField style={{ color: "#FFF" }} />);
    expect(getByTestId("textarea-field")).toHaveStyle({ color: "#FFF" });
  });

  it("Should render correctly with ref", () => {
    const ref = vi.fn();
    const { getByTestId } = render(<TextAreaField ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("Should render correctly with variant", () => {
    const { getByTestId } = render(<TextAreaField variant="sm" />);
    expect(getByTestId("textarea-field")).toHaveClass(
      "rounded-lg border border-1 outline-none w-full disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200 disable:cursor-not-allowed disable:opacity-50 disable:select-none text-sm placeholder:text-xs pl-2 pr-3 py-2",
    );
  });

  it("Should render correctly with size", () => {
    const { getByTestId } = render(<TextAreaField variant="md" />);
    expect(getByTestId("textarea-field")).toHaveClass(
      "rounded-lg border border-1 outline-none w-full disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200 disable:cursor-not-allowed disable:opacity-50 disable:select-none text-base placeholder:text-sm pl-3 pr-4 py-3",
    );
  });

  it("Should render correctly with tabIndex", () => {
    const { getByTestId } = render(<TextAreaField tabIndex={1} />);
    expect(getByTestId("textarea-field")).toHaveAttribute("tabindex", "1");
  });
});
