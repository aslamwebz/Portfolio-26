/** Client navigation keeps the original document's policy, not the next response's. */
export function documentNonce(fallback?: string): string | undefined {
    return typeof document === 'undefined'
        ? fallback
        : document.querySelector<HTMLMetaElement>('meta[property="csp-nonce"]')
              ?.nonce || fallback;
}
