import { renderHook } from "@testing-library/react";
import { page } from "@vitest/browser/context";
import { useMedia } from "../useMedia";

test("useMedia with minWidth", async () => {
  const { result, rerender } = renderHook(() =>
    useMedia({ minWidth: "768px" }),
  );
  expect(result.current).toBe(false);

  await page.viewport(800, 600);
  // Trigger a rerender to update the hook
  rerender();

  expect(result.current).toBe(true);
});

test("support feature detection", () => {
  const { result } = renderHook(() =>
    useMedia("(prefers-reduced-motion: no-preference)"),
  );

  // The hook should return the current value of the media query. Read if from the browser, so we are sure it's correct
  const matchedValue = matchMedia(
    "(prefers-reduced-motion: no-preference)",
  ).matches;

  expect(result.current).toBe(matchedValue);
});
