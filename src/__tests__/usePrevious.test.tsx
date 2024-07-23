import { renderHook } from "@testing-library/react";
import { usePrevious } from "../hooks/usePrevious";

test("should return the last result", () => {
  const { result, rerender } = renderHook(() => usePrevious("initial"));
  // The hook should return the previous value (before setting 'initial'), so `undefined` on first render
  expect(result.current).toBe(undefined);

  // Trigger a rerender to update the hook with a new value
  rerender("new-value");

  // Hook should return the previous value, which is now "initial"
  expect(result.current).toBe("initial");
});
