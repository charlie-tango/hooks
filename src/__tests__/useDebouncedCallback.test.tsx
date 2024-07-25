import { renderHook } from "@testing-library/react";
import { beforeEach } from "vitest";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";

beforeEach(() => {
  vi.useFakeTimers();
});

test("should call the callback after the delay", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  expect(cb).not.toHaveBeenCalled();
  result.current();
  expect(cb).not.toHaveBeenCalled();
  expect(result.current.isPending()).toBe(true);

  // Trigger the debounced function
  vi.advanceTimersToNextTimer();
  expect(cb).toHaveBeenCalled();
  expect(result.current.isPending()).toBe(false);
});

test("should flush isPending callbacks", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  result.current("a");
  result.current.flush();
  expect(cb).toHaveBeenCalledWith("a");
  expect(result.current.isPending()).toBe(false);
  expect(vi.getTimerCount()).toBe(0);
});

test("should cancel debounce", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  // Trigger debounce
  result.current();
  result.current?.cancel();
  expect(vi.getTimerCount()).toBe(0);
  expect(cb).not.toHaveBeenCalled();
});

test("should forward arguments correctly", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  result.current("a", "b", "c");

  // Trigger the debounced function
  vi.advanceTimersToNextTimer();
  expect(cb).toHaveBeenLastCalledWith("a", "b", "c");
});

test("should handle new calls while isPending", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  // Start with one value
  result.current("a");

  vi.advanceTimersByTime(250);
  result.current("b");
  vi.advanceTimersToNextTimer();

  // The last call should be the one that is debounced
  expect(cb).not.toHaveBeenCalledWith("a");
  expect(cb).toHaveBeenCalledWith("b");
});

test("should handle leading option", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() =>
    useDebouncedCallback(cb, 500, { leading: true, trailing: false }),
  );

  expect(cb).not.toHaveBeenCalled();
  result.current("a");
  expect(cb).toHaveBeenCalledWith("a");
  expect(result.current.isPending()).toBe(true);
  // Making a new call should not trigger the callback
  result.current("b");
  expect(cb).not.toHaveBeenCalledWith("b");

  vi.advanceTimersToNextTimer();
  result.current("c");
  expect(cb).toHaveBeenCalledWith("c");
});

test("should handle both leading and trailing option", async () => {
  const cb = vi.fn();
  const { result } = renderHook(() =>
    useDebouncedCallback(cb, 500, { leading: true, trailing: true }),
  );

  result.current("a");
  expect(cb).toHaveBeenCalledWith("a");
  expect(result.current.isPending()).toBe(true);
  result.current("b");

  expect(cb).not.toHaveBeenCalledWith("b");
  vi.advanceTimersToNextTimer();
  // Should trigger with the trailing value
  expect(cb).toHaveBeenCalledWith("b");
});

test("should infer the correct callback signature", async () => {
  const cb = (value: string, count: number, opts: { input: string }) => {};
  const { result } = renderHook(() => useDebouncedCallback(cb, 500));

  // Should infer the correct types
  expectTypeOf(result.current).parameter(0).toMatchTypeOf<string>();
  expectTypeOf(result.current).parameter(1).toMatchTypeOf<number>();
  expectTypeOf(result.current).parameter(2).toMatchTypeOf<{ input: string }>();
});
