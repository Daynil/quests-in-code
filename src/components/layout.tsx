import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../utils/hooks';
import Header from './header';

type Props = {
  path: string;
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  darkMode: false
});

const Layout = ({ path, children }: Props) => {
  const { darkMode, setDarkMode } = useDarkMode(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDarkSwitch = () => setDarkMode(!darkMode);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (menuOpen) document.body.style.overflowY = 'hidden';
    else {
      document.body.style.overflowY = 'unset';
      document.body.style.overflowY = 'overlay';
    }
  }, [menuOpen]);

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <div className={darkMode ? 'dark-mode' : ''}>
        <div className="min-h-screen dk:bg-gray-900 transition duration-200 ease-in-out">
          <Header
            path={path}
            handleDarkSwitch={handleDarkSwitch}
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
          />
          <div className="m-auto text-gray-900 dk:text-gray-300 text-lg px-6 md:max-w-3xl transition duration-200 ease-in-out">
            <main>{children}</main>
            <footer className="text-gray-600 mt-32 pb-12">
              © {new Date().getFullYear()} Quests In Code. All Rights Reserved.
            </footer>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
