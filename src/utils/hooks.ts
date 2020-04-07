import { useEffect, useState } from 'react';

/**
 * Initialize with local storage value if exists, update
 * local storage on state updates.
 * @param key Local storage key
 * @param defaultValue
 */
export function useLocalStorage(key: string, defaultValue: any) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultValue)
      );
    } catch (e) {
      value = defaultValue;
    }
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}

/**
 * Check local storage for existing site dark mode preference first.
 * If none exists, check for system color scheme preference.
 * Fall back to developer default.
 */
export function useDarkMode(
  darkDefault: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [state, setState] = useLocalStorage(
    'darkMode',
    window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : darkDefault
  );
  return [state, setState];
}
