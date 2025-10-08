import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";

describe("Search", () => {
  it("renders without crashing", () => {
    render(<Search data-testid="search" />);
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<Search data-testid="search" />);
    const searchIcon = screen
      .getByTestId("search")
      .parentElement?.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} data-testid="search" />);

    const searchInput = screen.getByTestId("search");
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
