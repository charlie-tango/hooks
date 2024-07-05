import { renderHook } from "@testing-library/react";
import useClientHydrated from "./useClientHydrated";

it("should be hydrated on client", () => {
  const hookOutput = renderHook(() => useClientHydrated());
  expect(hookOutput.result.current).toBe(true);
});
