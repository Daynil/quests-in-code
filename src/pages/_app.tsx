import { AppProps } from 'next/app';
import * as React from 'react';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
