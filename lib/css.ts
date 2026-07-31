import type { CSSProperties } from "react";

const cache = new Map<string, CSSProperties>();

/**
 * Parses a CSS declaration string into a React style object.
 *
 * The design source keeps its static styling as CSS text on each element. Rather
 * than hand-translating ~1500 declarations to camelCase (and risking silent
 * transcription drift), we keep the original text and convert at runtime. Results
 * are cached, so each unique string is parsed once for the life of the page.
 */
export function s(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;

  const style: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const at = decl.indexOf(":");
    if (at === -1) continue;
    const prop = decl.slice(0, at).trim();
    const value = decl.slice(at + 1).trim();
    if (!prop || !value) continue;
    style[prop.startsWith("--") ? prop : toCamel(prop)] = value;
  }

  const frozen = style as CSSProperties;
  cache.set(css, frozen);
  return frozen;
}

function toCamel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Merges a parsed CSS string with extra dynamic declarations. */
export function sx(css: string, extra?: CSSProperties): CSSProperties {
  return extra ? { ...s(css), ...extra } : s(css);
}
