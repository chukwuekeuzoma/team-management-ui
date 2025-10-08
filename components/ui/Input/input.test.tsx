import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("handles controlled input", () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveValue("test");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("handles uncontrolled input with defaultValue", () => {
    render(<Input defaultValue="default" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveValue("default");
  });

  it("does not show checkmark icon when empty", () => {
    render(<Input value="" data-testid="input" />);
    const checkmark = screen.queryByRole("img", { hidden: true });
    expect(checkmark).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-class");
  });
});
