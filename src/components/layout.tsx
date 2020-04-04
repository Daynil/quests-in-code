import React, { useState } from 'react';
import Header from './header';

type Props = {
  path: string;
  children: React.ReactNode;
};

const Layout = ({ path, children }: Props) => {
  const [darkMode, setDarkMode] = useState(true);
  const handleDarkSwitch = () => setDarkMode(!darkMode);
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="min-h-screen dk:bg-gray-900 transition duration-200 ease-in-out">
        <Header
          path={path}
          handleDarkSwitch={handleDarkSwitch}
          darkMode={darkMode}
        />
        <div className="m-auto text-gray-900 dk:text-gray-300 text-lg px-6 md:max-w-3xl transition duration-200 ease-in-out">
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()} Javascript Adventures. All Rights
            Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
