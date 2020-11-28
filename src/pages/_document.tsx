import Document, { Head, Html, Main, NextScript } from 'next/document';

/**
 * Determine our dark mode preferences by priority:
 * 1. Previously set dark mode for website with button
 * 2. Has a system dark mode preference
 * 3. Fallback to light mode
 */
function setInitialColorScheme() {
  const persistedColorPref = window.localStorage.getItem('darkMode');
  const hasPersistedColorPref = typeof persistedColorPref === 'string';

  if (hasPersistedColorPref) {
    document.body.classList.add(persistedColorPref);
    return;
  }

  const systemDarkPref = window.matchMedia('(prefers-color-scheme: dark)')
    .matches;
  const hasSystemDarkPref = typeof systemDarkPref === 'boolean';

  if (hasSystemDarkPref) {
    document.body.classList.add(systemDarkPref ? 'dark-mode' : 'light-mode');
    return;
  }

  document.body.classList.add('light-mode');
}

/**
 * This code is injected as a string
 * Thus, it is ignored on initial server render
 * It is only processed upon rehydration on the client side
 */
const colorSchemeIIFE = `(${String(setInitialColorScheme)})()`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-NHBE25MN4B"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NHBE25MN4B');
          `
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: colorSchemeIIFE }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
