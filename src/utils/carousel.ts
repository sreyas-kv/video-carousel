/**
 * Returns a non-negative modulo, enabling circular/infinite index wrapping.
 * JavaScript's native % can return negative values for negative operands.
 *
 * @example circularMod(-1, 5) // → 4
 * @example circularMod(6, 5)  // → 1
 */
export function circularMod(n: number, length: number): number {
  return ((n % length) + length) % length;
}

/**
 * Given an active index, returns an ordered array of `count` visible indices
 * wrapping infinitely around an array of `total` items.
 *
 * @example getVisibleIndices(3, 5, 4) // → [3, 4, 0, 1]
 */
export function getVisibleIndices(
  activeIndex: number,
  total: number,
  count: number
): number[] {
  return Array.from({ length: count }, (_, offset) =>
    circularMod(activeIndex + offset, total)
  );
}