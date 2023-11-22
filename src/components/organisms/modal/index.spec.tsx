import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./";
import { describe, it, expect, vi } from "vitest";

describe("Modal component", () => {
  it("renders correctly when isOpen is true", () => {
    const mockOnClose = vi.fn();
    const props = {
      isOpen: true,
      title: "Test Modal",
      onClose: mockOnClose,
      width: "400",
      height: "300",
    };
    render(<Modal {...props}>Modal Content</Modal>);

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not render when isOpen is false", () => {
    const props = {
      isOpen: false,
      title: "Test Modal",
      onClose: vi.fn(),
      width: "400",
      height: "300",
    };

    render(<Modal {...props}>Modal Content</Modal>);
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
  });
});
