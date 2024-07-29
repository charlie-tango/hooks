import { useEffect, useState } from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param url {string} The external script to load
 * @returns {ScriptStatus} The status of the script
 * */
export function useScript(url?: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!url) return "idle";
    if (typeof window === "undefined") return "loading";
    const script: HTMLScriptElement | null = document.querySelector(
      `script[src="${url}"]`,
    );

    // Check if the script is already in the document. If it is, return the status - Otherwise, return "loading" as we prepare to load the script later
    return (script?.getAttribute("data-status") as ScriptStatus) ?? "loading";
  });

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
  }, [url]);

  return status;
}
