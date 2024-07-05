import { renderHook } from "@testing-library/react";
import { useFocusTrap } from "./useFocusTrap";

it("should execute the useFocusTrap hook", () => {
  renderHook(() => useFocusTrap());
});
