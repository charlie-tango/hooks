import { act, fireEvent, renderHook } from "@testing-library/react";
import useWindowSize from "./useWindowSize";

it("should execute the useWindowSize hook", () => {
  const { result } = renderHook(() => useWindowSize());

  const { width, height } = result.current;
  expect(width).toBe(window.innerWidth);
  expect(height).toBe(window.innerHeight);
});

it("should update on resize", () => {
  const { result } = renderHook(() => useWindowSize());
  window.innerWidth = 1200;
  expect(result.current.width).toBe(1024);
  act(() => {
    fireEvent(window, new Event("resize"));
  });
  expect(result.current.width).toBe(1200);
  window.innerWidth = 1024;
});
