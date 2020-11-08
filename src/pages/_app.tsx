import { AppProps } from 'next/app';
import * as React from 'react';
import Layout from '../components/layout';
import '../styles/global.css';
import '../styles/blog-post.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {' '}
      <Component {...pageProps} />
    </Layout>
  );
}
