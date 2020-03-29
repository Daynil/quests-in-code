import React from 'react';
import Header from './header';

type Props = {
  path: string;
  children: React.ReactNode;
};

const Layout = ({ path, children }: Props) => {
  return (
    <div>
      <Header path={path} />
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
