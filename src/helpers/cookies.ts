export type CookieOptions = {
  /** The number of days until the cookie expires. If not defined, the cookies expires at the end of the session */
  expires?: number | Date;
  /** The path the cookie is valid for. Defaults to "/" */
  path?: string;
  /** The domain the cookie is valid for. Defaults to current domain */
  domain?: string;
  /** The SameSite attribute of the cookie. Defaults to "strict" */
  sameSite?: "strict" | "lax" | "none";
  /** Should the cookie only be sent over HTTPS? Defaults to true (if on a https site) */
  secure?: boolean;
};

function stringifyOptions(options: CookieOptions) {
  return Object.entries(options)
    .map(([key, value]) => {
      if (!value) {
        return undefined;
      }
      if (value === true) {
        return key;
      }
      if (key === "expires") {
        const expires = options[key] || 0;
        if (!expires) return undefined;
        if (expires instanceof Date) {
          return `expires=${expires.toUTCString()}`;
        }
        return `expires=${new Date(
          Date.now() + expires * 864e5,
        ).toUTCString()}`;
      }
      return `${key}=${value}`;
    })
    .filter(Boolean)
    .join("; ");
}

/**
 * Set a cookie, with a value and options.
 * @param name {string} The name of the cookie.
 * @param value {string}
 * @param options
 */
export function setCookie(
  name: string,
  value?: string,
  options: CookieOptions = {},
) {
  const optionsWithDefault: CookieOptions = {
    path: options.path || "/",
    sameSite: options.sameSite || "strict",
    secure: options.secure ?? document.location.protocol === "https:",
    // If expires is not set, set it to -1 (the past), so the cookie is deleted immediately
    expires: !value ? -1 : options.expires ?? 0,
    domain: options.domain,
  };

  const encodedValue = encodeURIComponent(value || "");
  const optionsString = stringifyOptions(optionsWithDefault);

  document.cookie = `${name}=${encodedValue}; ${optionsString}`;
}

/**
 * Get a cookie by name.
 * @param name {string} The name of the cookie.
 * @param cookies {string} The cookies string to parse it from. Set this to `document.cookie` on the client.
 */
export function getCookie(name: string, cookies: string) {
  const value = cookies
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : undefined;
}

/**
 * Convert the cookies object to a string.
 * @param cookies
 */
export function stringifyCookies(
  cookies: Record<string, string | undefined> = {},
) {
  return Object.keys(cookies)
    .map((key) => `${key}=${cookies[key]}`)
    .join("; ");
}
