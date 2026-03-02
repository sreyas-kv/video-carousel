import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavButton } from "./NavButton";

describe("NavButton", () => {
  it("renders a Previous button with correct aria-label", () => {
    render(<NavButton direction="prev" onClick={jest.fn()} />);
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
  });

  it("renders a Next button with correct aria-label", () => {
    render(<NavButton direction="next" onClick={jest.fn()} />);
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("accepts a custom label", () => {
    render(<NavButton direction="prev" onClick={jest.fn()} label="Go Back" />);
    expect(screen.getByLabelText("Go Back")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<NavButton direction="next" onClick={onClick} />);
    fireEvent.click(screen.getByLabelText("Next"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});