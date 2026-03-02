import { useState, useCallback, useEffect } from "react";
import type { NavigationDirection } from "../types";
import { circularMod, getVisibleIndices } from "../utils/carousel";

interface UseCarouselOptions {
  total: number;
  visibleCount: number;
  initialIndex?: number;
}

interface UseCarouselReturn {
  activeIndex: number;
  visibleIndices: number[];
  navigate: (direction: NavigationDirection) => void;
}

/**
 * Manages infinite carousel state.
 * Handles index wrapping and exposes keyboard navigation automatically.
 */
export function useCarousel({
  total,
  visibleCount,
  initialIndex = 0,
}: UseCarouselOptions): UseCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const navigate = useCallback(
    (direction: NavigationDirection) => {
      setActiveIndex((prev) => circularMod(prev + direction, total));
    },
    [total]
  );

  // Global keyboard arrow support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const visibleIndices = getVisibleIndices(activeIndex, total, visibleCount);

  return { activeIndex, visibleIndices, navigate };
}