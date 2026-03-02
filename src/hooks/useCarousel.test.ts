import { act } from "react";
import { renderHook } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

describe("useCarousel", () => {
  it("returns initial activeIndex and visibleIndices", () => {
    const { result } = renderHook(() =>
      useCarousel({ total: 5, visibleCount: 3 }),
    );
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.visibleIndices).toEqual([0, 1, 2]);
  });

  it("uses initialIndex when provided", () => {
    const { result } = renderHook(() =>
      useCarousel({ total: 5, visibleCount: 3, initialIndex: 2 }),
    );
    expect(result.current.activeIndex).toBe(2);
    expect(result.current.visibleIndices).toEqual([2, 3, 4]);
  });

  it("navigate(1) advances activeIndex and wraps at end", async () => {
    const { result } = renderHook(() =>
      useCarousel({ total: 3, visibleCount: 2 }),
    );
    await act(async () => {
      result.current.navigate(1);
    });
    expect(result.current.activeIndex).toBe(1);
    await act(async () => {
      result.current.navigate(1);
    });
    expect(result.current.activeIndex).toBe(2);
    await act(async () => {
      result.current.navigate(1);
    });
    expect(result.current.activeIndex).toBe(0);
  });

  it("navigate(-1) goes backward and wraps at start", async () => {
    const { result } = renderHook(() =>
      useCarousel({ total: 3, visibleCount: 2, initialIndex: 1 }),
    );
    await act(async () => {
      result.current.navigate(-1);
    });
    expect(result.current.activeIndex).toBe(0);
    await act(async () => {
      result.current.navigate(-1);
    });
    expect(result.current.activeIndex).toBe(2);
  });

  it("updates visibleIndices when activeIndex changes", async () => {
    const { result } = renderHook(() =>
      useCarousel({ total: 5, visibleCount: 3 }),
    );
    expect(result.current.visibleIndices).toEqual([0, 1, 2]);
    await act(async () => {
      result.current.navigate(1);
    });
    expect(result.current.visibleIndices).toEqual([1, 2, 3]);
    await act(async () => {
      result.current.navigate(1);
    });
    await act(async () => {
      result.current.navigate(1);
    });
    expect(result.current.visibleIndices).toEqual([3, 4, 0]);
  });
});
