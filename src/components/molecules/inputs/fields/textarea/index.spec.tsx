import { fireEvent, render } from "@testing-library/react";
import { TextAreaField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test TextAreaField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<TextAreaField />);
    expect(getByTestId("textarea-field")).toBeInTheDocument();
  });
});
