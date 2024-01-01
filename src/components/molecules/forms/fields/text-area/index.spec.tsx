import { render } from "@testing-library/react";
import { FieldTextArea } from "./";
import { describe, it, expect } from "vitest";
import { createRef } from "react";

describe("FieldTextArea component", () => {
  it("forwards ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    const props = {
      label: "Username",
      name: "username",
    };

    render(<FieldTextArea size="md" {...props} ref={ref} />);

    expect(ref.current).toBeInTheDocument();
    expect(ref?.current?.tagName).toBe("TEXTAREA");
  });
});
