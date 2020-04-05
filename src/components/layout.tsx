import React, { useEffect, useState } from 'react';
import Header from './header';

type Props = {
  path: string;
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  darkMode: false,
  menuOpen: false
});

const Layout = ({ path, children }: Props) => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDarkSwitch = () => setDarkMode(!darkMode);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);
  return (
    <ThemeContext.Provider value={{ darkMode, menuOpen }}>
      <div className={darkMode ? 'dark-mode' : ''}>
        <div className="min-h-screen dk:bg-gray-900 transition duration-200 ease-in-out">
          <Header
            path={path}
            handleDarkSwitch={handleDarkSwitch}
            handleMenuOpen={handleMenuOpen}
          />
          <div className="m-auto text-gray-900 dk:text-gray-300 text-lg px-6 md:max-w-3xl transition duration-200 ease-in-out">
            <main>{children}</main>
            <footer className="text-gray-600 mt-32">
              © {new Date().getFullYear()} Javascript Adventures. All Rights
              Reserved.
            </footer>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
