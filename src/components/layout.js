/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
      // style={{
      //   margin: `0 auto`,
      //   maxWidth: 960,
      //   padding: `0 1.0875rem 1.45rem`
      // }}
      >
        <main>{children}</main>
        <footer>© Javascript Adventures {new Date().getFullYear()}</footer>
      </div>
    </>
  );
};

export default Layout;
