import { circularMod, getVisibleIndices } from "./carousel";

describe("circularMod", () => {
  it("returns the same value for positive indices within bounds", () => {
    expect(circularMod(2, 5)).toBe(2);
  });

  it("wraps forward past the end of the array", () => {
    expect(circularMod(5, 5)).toBe(0);
    expect(circularMod(6, 5)).toBe(1);
  });

  it("wraps backward for negative indices", () => {
    expect(circularMod(-1, 5)).toBe(4);
    expect(circularMod(-2, 5)).toBe(3);
  });

  it("handles zero index", () => {
    expect(circularMod(0, 5)).toBe(0);
  });

  it("handles multiples of length", () => {
    expect(circularMod(10, 5)).toBe(0);
    expect(circularMod(11, 5)).toBe(1);
  });
});

describe("getVisibleIndices", () => {
  it("returns `count` indices starting from activeIndex", () => {
    expect(getVisibleIndices(0, 5, 4)).toEqual([0, 1, 2, 3]);
  });

  it("wraps around the end of the array", () => {
    expect(getVisibleIndices(3, 5, 4)).toEqual([3, 4, 0, 1]);
  });

  it("wraps when activeIndex is the last element", () => {
    expect(getVisibleIndices(4, 5, 4)).toEqual([4, 0, 1, 2]);
  });

  it("handles count equal to total", () => {
    expect(getVisibleIndices(0, 3, 3)).toEqual([0, 1, 2]);
  });

  it("handles a single visible card", () => {
    expect(getVisibleIndices(2, 5, 1)).toEqual([2]);
  });
});