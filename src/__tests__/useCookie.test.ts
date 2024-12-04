import { act, renderHook } from "@testing-library/react";
import { useCookie } from "../hooks/useCookie";

function setValue(
  value: string | ((prevValue?: string) => string | undefined) | undefined,
  hook: { current: ReturnType<typeof useCookie> },
) {
  act(() => {
    hook.current[1](value);
  });
}

function getValue(hook: { current: ReturnType<typeof useCookie> }) {
  return hook.current[0];
}

test("should manage cookies", () => {
  const { result: hook } = renderHook(() => useCookie("test"));

  setValue("custom value", hook);

  expect(getValue(hook)).toBe("custom value");

  setValue((prevValue) => `${prevValue}2`, hook);
  expect(getValue(hook)).toBe("custom value2");

  setValue(undefined, hook);
  expect(getValue(hook)).toBeUndefined();
});

test("should manage cookies with default value", () => {
  const { result: hook } = renderHook(() =>
    useCookie("test", { defaultValue: "default value" }),
  );

  expect(getValue(hook)).toBe("default value");

  setValue("custom value", hook);
  expect(getValue(hook)).toBe("custom value");

  setValue(undefined, hook);
  expect(getValue(hook)).toBe("default value");
});

test("should sync values across hooks", () => {
  const { result: hook } = renderHook(() => useCookie("test"));
  const { result: hook2 } = renderHook(() => useCookie("test"));

  setValue("new value", hook);

  expect(getValue(hook)).toBe("new value");
  expect(getValue(hook2)).toBe("new value");
});
