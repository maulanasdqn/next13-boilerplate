import { render } from "@testing-library/react";
import { Message } from ".";
import { describe, it, expect } from "vitest";

describe("Testing Message component", () => {
  it("renders without errors", () => {
    const { getByText } = render(<Message>Test Message</Message>);
    expect(getByText("Test Message")).toBeInTheDocument();
  });

  it("applies the correct styles based on status prop", () => {
    const { container, rerender } = render(<Message status="none">Test Message</Message>);

    expect(container.firstChild).toHaveClass("text-gray-400");

    rerender(<Message status="error">Test Message</Message>);
    expect(container.firstChild).toHaveClass("text-red-400");

    rerender(<Message status="success">Test Message</Message>);
    expect(container.firstChild).toHaveClass("text-green-400");

    rerender(<Message status="warning">Test Message</Message>);
    expect(container.firstChild).toHaveClass("text-yellow-400");
  });

  it("applies additional classes passed in the className prop", () => {
    const { container } = render(
      <Message status="none" className="custom-class">
        Test Message
      </Message>,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
