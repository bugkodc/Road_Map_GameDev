// Single source of truth for upstream documentation versions.
// Bump these when a new STABLE (non-beta) release ships, then run `npm run update:docs`
// (or let the monthly GitHub Action do it). Keeping only the latest version keeps the
// static payload light.
//
// Unity uses the 6000.x naming scheme: Unity 6.4 -> '6000.4', Unity 6.5 -> '6000.5', ...
export const UNITY_DOC_VERSION = '6000.4';

// Unreal Engine latest stable. Do not point at /preview or beta branches.
export const UNREAL_DOC_VERSION = '5.7';

// Game Programming Patterns has no real versioning; this only namespaces the cache.
export const GPP_VERSION = '1.0';
