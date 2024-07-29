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
    width: 100,
    height: 120,
  });
});

test("get element size with padding", async () => {
  const { result } = renderHook(useElementSize);

  render(
    <div
      ref={result.current.ref}
      style={{ paddingTop: 16, paddingBottom: 24, width: 100, height: 120 }}
    />,
  );

  // Wait until the ResizeObserver reports the size. This could take a few frames.
  await vi.waitUntil(() => result.current.size.width !== 0);

  expect(result.current.size).toEqual({
    width: 100,
    height: 160,
  });
});

test("get element content size", async () => {
  const { result } = renderHook(() => useElementSize({ type: "contentBox" }));
  render(
    <div
      ref={result.current.ref}
      style={{ paddingTop: 16, paddingBottom: 24, width: 100, height: 120 }}
    />,
  );

  // Wait until the ResizeObserver reports the size. This could take a few frames.
  await vi.waitUntil(() => result.current.size.width !== 0);

  expect(result.current.size).toEqual({
    width: 100,
    height: 120,
  });
});

test("skip creating the observer", async () => {
  const { result, rerender } = renderHook(useElementSize);
  render(<div ref={result.current.ref} style={{ width: 100, height: 120 }} />);

  // Wait until the ResizeObserver reports the size. This could take a few frames.
  await vi.waitUntil(() => result.current.size.width !== 0);

  expect(result.current.size).toEqual({
    width: 100,
    height: 120,
  });

  rerender({ skip: true });

  // Skipping should clear and reset the size
  expect(result.current.size).toEqual({
    width: 0,
    height: 0,
  });
});
