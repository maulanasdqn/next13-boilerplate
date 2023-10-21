import { render } from "@testing-library/react";
import { Label } from "./index";
import { expect, describe, it } from "vitest";

describe("Test Label Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<Label>Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
  });

  it("Should have asterisk if required is pass", () => {
    const { getByTestId } = render(<Label required>Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("required")).toHaveTextContent("*");
  });
});
