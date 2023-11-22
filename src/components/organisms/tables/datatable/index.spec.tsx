import { render, screen, act } from "@testing-library/react";
import { DataTable } from "./";
import { describe, it, expect } from "vitest";

describe("DataTable component", () => {
  it("renders table with header and body", () => {
    const columns = [
      { header: "Name", accessorKey: "name" },
      { header: "Age", accessorKey: "age" },
    ];

    const data = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
    ];

    const props = {
      columns,
      data,
    };

    act(() => render(<DataTable {...props} />));

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("renders table with sorting", () => {
    const columns = [
      { header: "Name", accessorKey: "name" },
      { header: "Age", accessorKey: "age" },
    ];

    const data = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
    ];

    const props = {
      columns,
      data,
    };
    act(() => render(<DataTable {...props} />));

    act(() => {
      const nameHeader = screen.getByText("Name");
      nameHeader.click();
    });

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});
