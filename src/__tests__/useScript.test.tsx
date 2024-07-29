import { cleanup, renderHook } from "@testing-library/react/pure";
import { afterEach } from "vitest";
import { useScript } from "../hooks/useScript";

declare global {
  interface Window {
    testScriptLoaded?: boolean;
  }
}

afterEach(() => {
  cleanup();
  // Ensure we remove the script from the document after a test run
  document.body.querySelectorAll("[data-status]").forEach((script) => {
    script.remove();
  });
  window.testScriptLoaded = undefined;
});

test("load external script", async () => {
  const { result } = renderHook(() => useScript("/test-script.js"));
  expect(result.current).toBe("loading");

  await vi.waitUntil(() => result.current === "ready");
  expect(window.testScriptLoaded).toBe(true);
});

test("should share script", async () => {
  const { result } = renderHook(() => useScript("/test-script.js"));
  await vi.waitUntil(() => result.current === "ready");

  // Creating a new hook with the same script should return ready immediately
  const { result: resultSecond } = renderHook(() =>
    useScript("/test-script.js"),
  );
  expect(resultSecond.current).toBe("ready");
});

test("multiple hooks with same script should sync status", async () => {
  const { result } = renderHook(() => useScript("/test-script.js"));
  const { result: resultSecond } = renderHook(() =>
    useScript("/test-script.js"),
  );
  expect(result.current).toBe("loading");
  expect(resultSecond.current).toBe("loading");

  await vi.waitUntil(() => result.current === "ready");
  expect(resultSecond.current).toBe("ready");
});

test("fail with invalid external script", async () => {
  const { result } = renderHook(() => useScript("/invalid-test-script.js"));
  expect(result.current).toBe("loading");

  await vi.waitUntil(() => result.current === "error");
});

test("idle until url", async () => {
  const { result, rerender } = renderHook(useScript);
  // Should start in idle state
  expect(result.current).toBe("idle");

  // Change to loading state if we add an url
  rerender("/test-script.js");
  expect(result.current).toBe("loading");

  await vi.waitUntil(() => result.current === "ready");
});

test("should be able to add custom attributes to the script", async () => {
  const { rerender } = renderHook(() =>
    useScript("/test-script.js", {
      attributes: {
        id: "test-id",
        "data-test": "true",
        nonce: "test-nonce",
      },
    }),
  );

  const script = document.querySelector("script[src='/test-script.js']");
  if (script) {
    expect(script).toHaveAttribute("id", "test-id");
    expect(script).toHaveAttribute("data-test", "true");
    expect(script).toHaveAttribute("nonce", "test-nonce");
  }

  rerender();
  rerender();
  rerender();
});
