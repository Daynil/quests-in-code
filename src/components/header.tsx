import { Link } from 'gatsby';
import React from 'react';

type Props = {
  path: string;
};

export default function Header({ path }: Props) {
  const navClassName =
    'transition duration-200 ml-4 px-3 py-2 rounded-md text-xl font-medium text-gray-900 hover:text-teal-800 hover:bg-teal-100 focus:outline-none';

  return (
    <header className="max-w-6xl mx-auto sm:px-6 lg:px-8 text-xl">
      <div className="flex items-center justify-between h-16">
        <div className="w-full justify-between flex items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-3xl font-medium text-gray-900 hover:text-gray-900"
            >
              {'{JS⚔} Adventures'}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <Link
                to="/posts"
                className={
                  path.match(/(^\/posts\/)/i)
                    ? navClassName + ' text-teal-800 bg-teal-100'
                    : navClassName
                }
              >
                Posts
              </Link>
              <Link
                to="/topics"
                className={navClassName}
                activeClassName={navClassName + ' text-teal-800 bg-teal-100'}
              >
                Topics
              </Link>
              <Link
                to="/about"
                className={navClassName}
                activeClassName={navClassName + ' text-teal-800 bg-teal-100'}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
