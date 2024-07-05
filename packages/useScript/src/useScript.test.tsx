import { act, fireEvent, renderHook } from "@testing-library/react";
import { useScript } from "./useScript";

const url = "/api.js";

afterEach(() => {
  document.head.querySelectorAll("script").forEach((script) => {
    script.remove();
  });
});

it("should load the external script", () => {
  const { result, rerender } = renderHook(() => useScript(url));
  const script = document.querySelector(`script[src="${url}"]`);
  expect(script).toBeDefined();

  if (!script) return;

  expect(result.current[0]).toBe(false);
  expect(result.current[1]).toBe("loading");

  // Fire the load event
  act(() => {
    fireEvent(script, new Event("load"));
  });
  rerender();
  expect(script.getAttribute("data-status")).toBe("ready");
  expect(result.current[0]).toBe(true);
  expect(result.current[1]).toBe("ready");
});

it("should handle errors when loading", () => {
  const { result, rerender } = renderHook(() => useScript(url));
  const script = document.querySelector(`script[src="${url}"]`);
  expect(script).toBeDefined();
  if (!script) return;

  act(() => {
    // Fire the error event
    fireEvent(script, new Event("error"));
  });

  rerender();
  expect(script.getAttribute("data-status")).toBe("error");
  expect(result.current[0]).toBe(false);
  expect(result.current[1]).toBe("error");
});

it("should not create more then one script entry", () => {
  renderHook(() => useScript(url));
  renderHook(() => useScript(url));
  renderHook(() => useScript(url));

  const scripts = document.querySelectorAll(`script[src="${url}"]`);
  expect(scripts).toHaveLength(1);
});
