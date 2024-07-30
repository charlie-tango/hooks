import { act, renderHook } from "@testing-library/react";
import { page } from "@vitest/browser/context";
import { useViewportSize } from "../hooks/useViewportSize";

test("get viewport size", async () => {
  await page.viewport(800, 600);
  const { result } = renderHook(useViewportSize);
  expect(result.current).toEqual({ width: 800, height: 600 });

  // Should observe the new viewport size on `resize`
  await page.viewport(1024, 768);

  act(() => {
    window.visualViewport?.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toEqual({ width: 1024, height: 768 });
});

test("fallback to window size", async () => {
  await page.viewport(800, 600);
  // Remove `visualViewport` to test the fallback to `window.innerWidth` and `window.innerHeight` values
  window.visualViewport = null;
  const { result } = renderHook(useViewportSize);
  expect(result.current).toEqual({ width: 800, height: 600 });

  // Should observe the new viewport size on `resize`
  await page.viewport(1024, 768);

  act(() => {
    window.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toEqual({ width: 1024, height: 768 });
});
