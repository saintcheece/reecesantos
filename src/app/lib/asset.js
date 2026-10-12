/** Resolve a path inside /public (respects Vite's `base`, encodes spaces/parentheses). */
export function asset(path) {
  return encodeURI(`${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`);
}
