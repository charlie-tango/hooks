import { act, renderHook } from "@testing-library/react";
import useToggle from "./useToggle";

it("should execute the useToggle hook", () => {
  const initialValue = false;
  const { result } = renderHook(() => useToggle(initialValue));
  const [isToggled, toggle] = result.current;

  expect(typeof toggle).toBe("function");
  expect(typeof isToggled).toBe("boolean");
  expect(isToggled).toBe(initialValue);
});

it("should toggle", () => {
  const initialValue = false;
  const { result } = renderHook(() => useToggle(initialValue));
  const [, toggle] = result.current;
  act(toggle);
  const [isToggled] = result.current;

  expect(isToggled).toBe(!initialValue);
});
