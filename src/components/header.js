import { Link } from 'gatsby';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header>
    <div className="w-10/12 m-auto">
      <span className="text-blue-500 text-3xl">
        <Link to="/" className="no-underline">
          {siteTitle}
        </Link>
      </span>
    </div>
  </header>
);

export default Header;
