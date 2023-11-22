import { render, screen } from "@testing-library/react";
import { FieldCheckbox } from "./";
import { describe, it, expect } from "vitest";
import { createRef } from "react";

describe("FieldCheckbox component", () => {
  it("renders correctly", () => {
    const props = {
      label: "Username",
      name: "username",
    };

    render(<FieldCheckbox size="md" {...props} />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByTestId("input-checkbox")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      label: "Username",
      name: "username",
    };

    render(<FieldCheckbox size="md" {...props} ref={ref} />);

    expect(ref.current).toBeInTheDocument();
    expect(ref?.current?.tagName).toBe("INPUT");
  });
});
