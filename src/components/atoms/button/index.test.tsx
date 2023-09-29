//Make A Unit Test For Button Componenet
import { Button } from ".";
import { render, screen } from "@testing-library/react";

describe("Button Component", () => {
  it("should render button", () => {
    render(<Button variant={"primary"} size={"sm"} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
