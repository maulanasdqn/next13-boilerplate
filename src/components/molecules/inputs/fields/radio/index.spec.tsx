import { fireEvent, getAllByLabelText, render } from "@testing-library/react";
import { RadioField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test RadioField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<RadioField options={[{ label: "test", value: "test" }]} />);
    expect(getByTestId("radio-field")).toBeInTheDocument();
  });

  it("Should render correctly with direction", () => {
    const { getByTestId } = render(
      <RadioField options={[{ label: "test", value: "test" }]} direction="column" />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
  });

  it("Should render correctly with disabled", () => {
    const { getByTestId } = render(
      <RadioField options={[{ label: "test", value: "test" }]} disabled />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
    expect(getByTestId("radio-field")).toBeDisabled();
  });

  it("Should render correctly with checked", () => {
    const { getByTestId } = render(
      <RadioField options={[{ label: "test", value: "test" }]} value="test" />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
    expect(getByTestId("radio-field")).toBeChecked();
  });

  it("Should render correctly with onChange", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <RadioField options={[{ label: "test", value: "test" }]} onChange={onChange} />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
    fireEvent.click(getByTestId("radio-field"));
    expect(onChange).toHaveBeenCalled();
  });

  it("Should render correctly with name", () => {
    const { getByTestId } = render(
      <RadioField options={[{ label: "test", value: "test" }]} name="test" />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
    expect(getByTestId("radio-field")).toHaveAttribute("name", "test");
  });

  it("Should render correctly with label", () => {
    const { getByTestId, getAllByText } = render(
      <RadioField options={[{ label: "test", value: "test" }]} label="test" />,
    );
    expect(getByTestId("radio-field")).toBeInTheDocument();
    expect(getAllByText("test")).toHaveLength(2);
  });

  it("Should render correctly with options", () => {
    const { getAllByLabelText } = render(
      <RadioField
        options={[
          { label: "test", value: "test" },
          { label: "test", value: "test" },
        ]}
      />,
    );
    expect(getAllByLabelText("test")).toHaveLength(1);
  });
});
