import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { SiteTitleQueryQuery } from '../../graphql-types';
import Header from './header';

const Layout = ({ children }) => {
  const data = useStaticQuery<SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} />
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
