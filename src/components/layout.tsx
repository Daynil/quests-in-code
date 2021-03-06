import React, { useEffect, useState } from 'react';
import Header from './header';
import TextLink from './text-link';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  darkMode: false
});

const Layout = ({ children }: Props) => {
  // const { darkMode, setDarkMode } = useDarkMode(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const handleDarkSwitch = () => setDarkMode(!darkMode);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  const [darkMode, rawSetDarkMode] = useState(undefined);

  useEffect(() => {
    // Retrieve initial darkmode after hydration
    rawSetDarkMode(document.body.classList.contains('dark-mode'));
  }, []);

  function handleDarkSwitch() {
    function getModeClass(darkMode: boolean): 'dark-mode' | 'light-mode' {
      return darkMode ? 'dark-mode' : 'light-mode';
    }

    const newDarkMode = !darkMode;
    rawSetDarkMode(newDarkMode);

    // Swap dark mode classes
    document.body.classList.remove(getModeClass(darkMode));
    document.body.classList.add(getModeClass(newDarkMode));

    localStorage.setItem('darkMode', getModeClass(newDarkMode));
  }

  useEffect(() => {
    if (menuOpen) document.body.style.overflowY = 'hidden';
    else {
      document.body.style.overflowY = 'unset';
      document.body.style.overflowY = 'overlay';
    }
  }, [menuOpen]);

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <div>
        <div className="min-h-screen dk:bg-gray-900 transition duration-200 ease-in-out border-t-4 border-dblue-500">
          <Header
            handleDarkSwitch={handleDarkSwitch}
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
          />
          <div className="m-auto text-gray-900 dk:text-gray-300 text-lg px-6 md:max-w-3xl transition duration-200 ease-in-out">
            <main>{children}</main>
            <footer className="text-gray-600 mt-32 pb-12">
              © {new Date().getFullYear()} Quests In Code. All Rights Reserved.
              Created by{' '}
              <TextLink href="https://dlibin.net">Danny Libin</TextLink>.
            </footer>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
