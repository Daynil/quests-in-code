import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TextLink from '../components/text-link';

type Props = {
  path: string;
};

const NotFoundPage = ({ path }: Props) => (
  <Layout path={path}>
    <SEO title="404: Not found" />
    <h1 className="mt-20">This is not the page you're looking for 🤖</h1>
    <p>Looks like you've gotten lost in the woods!</p>
    <TextLink href="/">Back to safety</TextLink>
  </Layout>
);

export default NotFoundPage;
