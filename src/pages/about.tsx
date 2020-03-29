import { Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  path: string;
};

export default function About({ path }: Props) {
  return (
    <Layout path={path}>
      <SEO title="About" />
      <h1>About Page</h1>
      <p>Welcome to about</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}
