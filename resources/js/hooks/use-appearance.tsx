import { useCallback, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';
export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};
const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'dark';
const valid = (value: string | null | undefined): value is Appearance =>
    value === 'light' || value === 'dark' || value === 'system';
const prefersDark = () =>
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;
const resolve = (mode: Appearance): ResolvedAppearance =>
    mode === 'dark' || (mode === 'system' && prefersDark()) ? 'dark' : 'light';
const notify = () => listeners.forEach((listener) => listener());
const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => {
        listeners.delete(callback);
    };
};
const applyTheme = () =>
    document.documentElement.classList.toggle(
        'dark',
        resolve(currentAppearance) === 'dark',
    );
const saveCookie = (mode: Appearance) => {
    document.cookie =
        'appearance=' + mode + ';path=/;max-age=31536000;SameSite=Lax';
};
const savePreference = (mode: Appearance) => {
    try {
        localStorage.setItem('appearance', mode);
    } catch {
        /* Theme changes still work when browser storage is unavailable. */
    }
    saveCookie(mode);
};
export function initializeTheme(): void {
    let stored: string | null = null;
    try {
        stored = localStorage.getItem('appearance');
    } catch {
        /* Use the server cookie instead. */
    }
    const cookie = document.cookie
        .split('; ')
        .find((item) => item.startsWith('appearance='))
        ?.split('=')[1];
    currentAppearance = valid(stored)
        ? stored
        : valid(cookie)
          ? cookie
          : 'dark';
    applyTheme();
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
            applyTheme();
            notify();
        });
}
export function useAppearance(): UseAppearanceReturn {
    const snapshot = useSyncExternalStore(
        subscribe,
        () => currentAppearance + ':' + resolve(currentAppearance),
        () => 'dark:dark',
    );
    const [appearance, resolvedAppearance] = snapshot.split(':') as [
        Appearance,
        ResolvedAppearance,
    ];
    const updateAppearance = useCallback((mode: Appearance) => {
        currentAppearance = mode;
        savePreference(mode);
        applyTheme();
        notify();
    }, []);
    return { appearance, resolvedAppearance, updateAppearance };
}
