import { fireEvent, render } from "@testing-library/react";
import { CheckBoxField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test CheckBoxField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<CheckBoxField />);
    expect(getByTestId("checkbox-field")).toBeInTheDocument();
  });
});
