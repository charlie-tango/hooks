import { cleanup, render, renderHook } from "@testing-library/react/pure";
import { afterEach, vi } from "vitest";
import { useElementSize } from "../hooks/useElementSize";

afterEach(cleanup);

test("get element size", async () => {
  const { result } = renderHook(useElementSize);

  render(<div ref={result.current.ref} style={{ width: 100, height: 120 }} />);

  // Wait until the ResizeObserver reports the size. This could take a few frames.
  await vi.waitUntil(() => result.current.size.width !== 0);

  expect(result.current.size).toEqual({
    x: 0,
    y: 0,
    width: 100,
    height: 120,
    left: 0,
    top: 0,
    right: 100,
    bottom: 120,
  });
});
