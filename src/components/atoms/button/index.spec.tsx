import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from ".";
import { expect, describe, it, vi as jest } from "vitest";

describe("Test Button Functionality", () => {
  it("Should have onClick", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
  });

  it("Should have ignore onClick when disabled", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button disabled onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalledTimes(0);
  });

  it("Should have type submit when type set to submit", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="submit" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "submit");
  });

  it("Should have type button when type set to button", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="button" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "button");
  });

  it("Should have type reset when type set to reset", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="reset" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "reset");
  });
});
