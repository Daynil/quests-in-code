import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="m-auto text-gray-900 text-lg px-6 md:max-w-3xl">
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} Javascript Adventures. All Rights
          Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
