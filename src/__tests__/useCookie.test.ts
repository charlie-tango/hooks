import { act, renderHook } from "@testing-library/react";
import { revalidateCookies, useCookie } from "../hooks/useCookie";

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

afterEach(() => {
  // Clear all cookies after each test
  document.cookie.split(";").forEach((c) => {
    document.cookie = `${c.trim().split("=")[0]}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  });
});

test("should manage cookies", () => {
  const { result: hook } = renderHook(() => useCookie("manage-test"));

  setValue("custom value", hook);

  expect(getValue(hook)).toBe("custom value");

  setValue((prevValue) => `${prevValue}2`, hook);
  expect(getValue(hook)).toBe("custom value2");

  setValue(undefined, hook);
  expect(getValue(hook)).toBeUndefined();
});

test("should manage cookies with default value", () => {
  const { result: hook } = renderHook(() =>
    useCookie("default-value", { defaultValue: "default value" }),
  );

  expect(getValue(hook)).toBe("default value");

  setValue("custom value", hook);
  expect(getValue(hook)).toBe("custom value");

  setValue(undefined, hook);
  expect(getValue(hook)).toBe("default value");
});

test("should sync values across hooks", () => {
  const { result: hook } = renderHook(() => useCookie("sync"));
  const { result: hook2 } = renderHook(() => useCookie("sync"));

  setValue("new value", hook);

  expect(getValue(hook)).toBe("new value");
  expect(getValue(hook2)).toBe("new value");
});

test("should be able to revalidate cookies externally", () => {
  const { result: hook } = renderHook(() => useCookie("external"));
  document.cookie = "external=new value";
  expect(hook.current[0]).toBe(undefined);

  act(() => {
    // Revalidate the cookies, trigger the external sync
    revalidateCookies();
  });

  expect(hook.current[0]).toBe("new value");
});
