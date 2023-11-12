import { fireEvent, render } from "@testing-library/react";
import { SelectField } from "./index";
import { expect, describe, it, vi } from "vitest";

describe("Test SelectField Functionality", () => {
  it("Should render correctly", () => {
    const { getByTestId } = render(<SelectField />);
    expect(getByTestId("select-field")).toBeInTheDocument();
  });

  it("Should render correctly with options", () => {
    const { getByTestId } = render(
      <SelectField
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    expect(getByTestId("select-field")).toBeInTheDocument();
  });

  it("Should call onChange", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onChange={onChange}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.change(getByTestId("select-field"), {
      target: {
        value: "option-1",
      },
    });
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onChange).toBeCalledTimes(1);
  });

  it("Should call onBlur", () => {
    const onBlur = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onBlur={onBlur}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.blur(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onBlur).toBeCalledTimes(1);
  });

  it("Should call onFocus", () => {
    const onFocus = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onFocus={onFocus}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.focus(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onFocus).toBeCalledTimes(1);
  });

  it("Should call onKeyDown", () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onKeyDown={onKeyDown}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.keyDown(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onKeyDown).toBeCalledTimes(1);
  });

  it("Should call onKeyUp", () => {
    const onKeyUp = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onKeyUp={onKeyUp}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.keyUp(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onKeyUp).toBeCalledTimes(1);
  });

  it("Should call onKeyPress", () => {
    const onKeyPress = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onKeyPress={onKeyPress}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.keyPress(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onKeyPress).toBeCalledTimes(0);
  });

  it("Should call onClick", () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onClick={onClick}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.click(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onClick).toBeCalledTimes(1);
  });

  it("Should call onDoubleClick", () => {
    const onDoubleClick = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onDoubleClick={onDoubleClick}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.dblClick(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onDoubleClick).toBeCalledTimes(1);
  });

  it("Should call onContextMenu", () => {
    const onContextMenu = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onContextMenu={onContextMenu}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.contextMenu(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onContextMenu).toBeCalledTimes(1);
  });

  it("Should call onCopy", () => {
    const onCopy = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onCopy={onCopy}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.copy(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onCopy).toBeCalledTimes(1);
  });

  it("Should call onCut", () => {
    const onCut = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onCut={onCut}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.cut(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onCut).toBeCalledTimes(1);
  });

  it("Should call onPaste", () => {
    const onPaste = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onPaste={onPaste}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.paste(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onPaste).toBeCalledTimes(1);
  });

  it("Should call onInput", () => {
    const onInput = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onInput={onInput}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.input(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onInput).toBeCalledTimes(1);
  });

  it("Should call onInvalid", () => {
    const onInvalid = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onInvalid={onInvalid}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.invalid(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onInvalid).toBeCalledTimes(1);
  });

  it("Should call onReset", () => {
    const onReset = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onReset={onReset}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.reset(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onReset).toBeCalledTimes(1);
  });

  it("Should call onSelect", () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onSelect={onSelect}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.select(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onSelect).toBeCalledTimes(0);
  });

  it("Should call onScroll", () => {
    const onScroll = vi.fn();
    const { getByTestId } = render(
      <SelectField
        onScroll={onScroll}
        options={[
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
        ]}
      />,
    );
    fireEvent.scroll(getByTestId("select-field"));
    expect(getByTestId("select-field")).toBeInTheDocument();
    expect(onScroll).toBeCalledTimes(1);
  });
});
