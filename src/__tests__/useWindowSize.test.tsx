import { act, renderHook } from "@testing-library/react";
import { page } from "@vitest/browser/context";
import { useWindowSize } from "../hooks/useWindowSize";

test("get window size", async () => {
  await page.viewport(800, 600);
  const { result } = renderHook(useWindowSize);
  expect(result.current).toEqual({ width: 800, height: 600 });

  await act(async () => {
    // Should observe the new viewport size on `resize`
    await page.viewport(1024, 768);
    window.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toEqual({ width: 1024, height: 768 });
});
