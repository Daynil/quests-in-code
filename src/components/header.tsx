import { Link } from 'gatsby';
import React from 'react';

export default function Header() {
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
                className="ml-4 px-3 py-2 rounded-md text-xl font-medium text-gray-900 hover:text-teal-800 hover:bg-teal-100 focus:outline-none"
              >
                Posts
              </Link>
              <Link
                to="/topics"
                className="ml-4 px-3 py-2 rounded-md text-xl font-medium text-gray-900 hover:text-teal-800 hover:bg-teal-100 focus:outline-none"
              >
                Topics
              </Link>
              <Link
                to="/about"
                className="ml-4 px-3 py-2 rounded-md text-xl font-medium text-gray-900 hover:text-teal-800 hover:bg-teal-100 focus:outline-none"
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