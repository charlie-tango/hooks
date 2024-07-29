import { useEffect, useState } from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

type ScriptOptions = {
  attributes?: Record<string, string>;
};

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param url {string} The external script to load
 * @param options {ScriptOptions} The options for the script
 * @param options.attributes {HTMLScriptElement["attributes"]} Extra attributes to add to the script element
 * @returns {ScriptStatus} The status of the script
 * */
export function useScript(
  url: string | undefined,
  options?: ScriptOptions,
): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!url) return "idle";
    if (typeof window === "undefined") return "loading";
    const script: HTMLScriptElement | null = document.querySelector(
      `script[src="${url}"]`,
    );

    // Check if the script is already in the document. If it is, return the status - Otherwise, return "loading" as we prepare to load the script later
    return (script?.getAttribute("data-status") as ScriptStatus) ?? "loading";
  });

  const attributes = options?.attributes;

  // biome-ignore lint/correctness/useExhaustiveDependencies: We convert the attributes object to a string to see if it has changed, so it can't be detected by the rule
  useEffect(() => {
    if (!url) {
      setStatus("idle");
      return;
    }

    const script: HTMLScriptElement =
      document.querySelector(`script[src="${url}"]`) ||
      document.createElement("script");

    if (!script.src) {
      script.src = url;
      script.async = true;
      script.setAttribute("data-status", "loading");

      document.body.appendChild(script);

      // Ensure the status is loading
      setStatus("loading");
    } else if (script.hasAttribute("data-status")) {
      setStatus(script.getAttribute("data-status") as ScriptStatus);
    }

    if (attributes) {
      // Add extra attributes to the script element
      // If for some reason you have conflicting attributes, the last hook to execute will win
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    const eventHandler = (e: Event) => {
      const status: ScriptStatus = e.type === "load" ? "ready" : "error";
      script.setAttribute("data-status", status);
      setStatus(status);
    };

    // Add load event listener
    script.addEventListener("load", eventHandler);
    script.addEventListener("error", eventHandler);

    return () => {
      script.removeEventListener("load", eventHandler);
      script.removeEventListener("error", eventHandler);
    };
  }, [url, attributes ? JSON.stringify(attributes) : undefined]);

  return status;
}
