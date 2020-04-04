import { Link } from 'gatsby';
import React from 'react';
import MoonIcon from './svg/MoonIcon';
import SunIcon from './svg/SunIcon';

type Props = {
  path: string;
  darkMode: boolean;
  handleDarkSwitch: () => void;
};

export default function Header({ path, handleDarkSwitch, darkMode }: Props) {
  const navClassName =
    'transition duration-200 ease-in-out ml-4 px-3 py-2 text-xl font-medium text-gray-900 border-b-2 border-transparent dk:text-gray-100 dk-hover:text-dblue-500 hover:border-dblue-500 hover:text-dblue-500 hover:text-dblue-500 focus:outline-none';
  const activeClassName =
    ' text-dblue-500 border-b-2 border-dblue-500 dk:border-dblue-500 dk:text-dblue-100';

  return (
    <header className="max-w-6xl mx-auto sm:px-6 lg:px-8 text-xl">
      <div className="flex items-center justify-between h-16">
        <div className="w-full justify-between flex items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-3xl font-medium text-gray-900 dk:text-dblue-100"
            >
              {'{⚔} JS Adventures'}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <Link
                to="/posts"
                className={
                  path.match(/(^\/posts\/)/i)
                    ? navClassName + activeClassName
                    : navClassName
                }
              >
                Posts
              </Link>
              <Link
                to="/topics"
                className={navClassName}
                activeClassName={navClassName + activeClassName}
              >
                Topics
              </Link>
              <Link
                to="/about"
                className={navClassName}
                activeClassName={navClassName + activeClassName}
              >
                About
              </Link>
              <button
                className="transition duration-200 ease-in-out ml-4 px-3 py-2 text-xl font-medium text-gray-900 border-b-2 border-transparent dk:text-gray-100 dk-hover:text-dblue-400 hover:text-dblue-500 hover:text-dblue-500 focus:outline-none self-center hover:border-transparent"
                onClick={handleDarkSwitch}
              >
                {darkMode ? (
                  <SunIcon className="w-8" />
                ) : (
                  <MoonIcon className="w-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
