import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  // Should be no pending timers after each test
  expect(vi.getTimerCount()).toBe(0);
});

test("should update the value after the delay", async () => {
  const initialValue = "hello";
  const { result } = renderHook(() => useDebouncedValue(initialValue, 500));

  expect(result.current[0]).toBe(initialValue);
  result.current[1]("world");
  act(() => {
    vi.runAllTimers();
  });

  expect(result.current[0]).toBe("world");
});

test("should handle initial value as method", async () => {
  const initialValue = vi.fn();
  initialValue.mockReturnValue("hello");
  const { result, rerender } = renderHook(() =>
    useDebouncedValue(initialValue, 500),
  );

  expect(result.current[0]).toBe("hello");
  rerender();
  expect(initialValue).toHaveBeenCalledTimes(1);
});

test("should skip old value", async () => {
  const initialValue = "hello";
  const { result } = renderHook(() => useDebouncedValue(initialValue, 500));

  expect(result.current[0]).toBe(initialValue);
  result.current[1]("new");
  act(() => {
    vi.advanceTimersByTime(250);
  });

  expect(result.current[0]).toBe(initialValue);

  result.current[1]("world");
  act(() => {
    vi.runAllTimers();
  });

  expect(result.current[0]).toBe("world");
});

test("should not update if 'initial value' is changed", async () => {
  const { result, rerender } = renderHook((initialValue = "hello") =>
    useDebouncedValue(initialValue, 500),
  );
  expect(result.current[0]).toBe("hello");
  rerender("world");
  expect(result.current[1].isPending()).toBe(false);
  expect(result.current[0]).toBe("hello");
});

test("should update the value immediately if leading is true", async () => {
  const initialValue = "hello";
  const { result } = renderHook(() =>
    useDebouncedValue(initialValue, 500, { leading: true }),
  );

  expect(result.current[0]).toBe(initialValue);
  act(() => {
    result.current[1]("world");
  });
  expect(result.current[0]).toBe("world");

  act(() => {
    vi.runAllTimers();
  });
});

test("should be able to flush the debounce", async () => {
  const initialValue = "hello";
  const { result } = renderHook(() => useDebouncedValue(initialValue, 500));

  expect(result.current[0]).toBe(initialValue);
  result.current[1]("world");
  expect(result.current[1].isPending()).toBe(true);
  act(() => {
    result.current[1].flush();
  });
  expect(result.current[0]).toBe("world");
});

test("should be able to cancel the debounce", async () => {
  const initialValue = "hello";
  const { result } = renderHook(() => useDebouncedValue(initialValue, 500));

  expect(result.current[0]).toBe(initialValue);
  result.current[1]("world");
  expect(result.current[1].isPending()).toBe(true);
  act(() => {
    result.current[1].cancel();
  });
  expect(result.current[0]).toBe("hello");
});
