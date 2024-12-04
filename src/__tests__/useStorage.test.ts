import { act, renderHook } from "@testing-library/react";
import { useStorage } from "../hooks/useStorage";

function setValue(
  value:
    | string
    | ((prevValue?: string | null) => string | undefined | null)
    | undefined,
  hook: { current: ReturnType<typeof useStorage> },
) {
  act(() => {
    hook.current[1](value);
  });
}

function getValue(hook: { current: ReturnType<typeof useStorage> }) {
  return hook.current[0];
}

test("should set storage", () => {
  const { result: hook } = renderHook(() => useStorage("test"));

  setValue("storage value", hook);
  expect(getValue(hook)).toBe("storage value");

  setValue((prevValue) => `${prevValue}2`, hook);
  expect(getValue(hook)).toBe("storage value2");

  setValue(undefined, hook);
  expect(getValue(hook)).toBeNull();
});

test("should support a defaultValue", () => {
  const { result: hook } = renderHook(() =>
    useStorage("test", { defaultValue: "default value" }),
  );

  expect(getValue(hook)).toBe("default value");

  setValue("storage value", hook);
  expect(getValue(hook)).toBe("storage value");

  setValue(undefined, hook);
  expect(getValue(hook)).toBe("default value");
});

test("should set session storage", () => {
  const { result: hook } = renderHook(() =>
    useStorage("test", { type: "session" }),
  );

  setValue("storage value", hook);
  expect(getValue(hook)).toBe("storage value");

  setValue((prevValue) => `${prevValue}2`, hook);
  expect(getValue(hook)).toBe("storage value2");

  setValue(undefined, hook);
  expect(getValue(hook)).toBeNull();
});

test("should sync values across hooks", () => {
  const { result: hook } = renderHook(() => useStorage("test"));
  const { result: hook2 } = renderHook(() => useStorage("test"));

  setValue("new value", hook);

  expect(getValue(hook)).toBe("new value");
  expect(getValue(hook2)).toBe("new value");
});
