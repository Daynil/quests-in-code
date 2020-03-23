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
      <div
        className="m-auto max-w-3xl text-gray-900 text-lg"
        // style={{
        //   margin: `0 auto`,
        //   maxWidth: 960,
        //   padding: `0 1.0875rem 1.45rem`
        // }}
      >
        <main>{children}</main>
        <footer>© Javascript Adventures {new Date().getFullYear()}</footer>
      </div>
    </div>
  );
};

export default Layout;
