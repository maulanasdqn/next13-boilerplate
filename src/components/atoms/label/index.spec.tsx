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

  it("Should be disabled if disabled is pass", () => {
    const { getByTestId } = render(<Label disabled>Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("label")).toHaveClass("cursor-not-allowed opacity-50");
  });

  it("Should not be disabled if disabled is not pass", () => {
    const { getByTestId } = render(<Label>Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("label")).not.toHaveClass("cursor-not-allowed opacity-50");
  });

  it("Should have correct size", () => {
    const { getByTestId } = render(<Label size="sm">Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("label")).toHaveClass("text-sm");
  });

  it("Should have correct size", () => {
    const { getByTestId } = render(<Label size="md">Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("label")).toHaveClass("text-base");
  });

  it("Should have correct size", () => {
    const { getByTestId } = render(<Label size="lg">Label</Label>);
    expect(getByTestId("label")).toHaveTextContent("Label");
    expect(getByTestId("label")).toHaveClass("text-lg");
  });

  it("Should have correct htmlFor", () => {
    const { getByTestId } = render(<Label htmlFor="label">Label</Label>);
    expect(getByTestId("label")).toHaveAttribute("for", "label");
  });

  it("Should have correct className", () => {
    const { getByTestId } = render(<Label className="test-class">Label</Label>);
    expect(getByTestId("label")).toHaveClass("test-class");
  });
});
