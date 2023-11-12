import { fireEvent, render } from "@testing-library/react";
import { SelectField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test SelectField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<SelectField />);
    expect(getByTestId("select-field")).toBeInTheDocument();
  });
});
