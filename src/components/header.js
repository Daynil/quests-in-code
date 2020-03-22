import { Link } from 'gatsby';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="bg-blue-500">
    <div>
      <h1>
        <Link to="/" className="no-underline">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
