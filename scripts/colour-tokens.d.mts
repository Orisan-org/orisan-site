/**
 * Types for the colour token map, so tests can import it. The runtime module is
 * plain .mjs because the colour gates run under node directly, without a build
 * step — this declares its shape rather than duplicating the values.
 */
export declare const TOKENS: Record<string, string>;
export declare const EXCEPTIONS: Record<string, string>;
export declare function extract(css: string): Map<string, string>;
export declare function stripComments(src: string): string;
