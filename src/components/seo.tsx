import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
} & typeof defaultProps;

const defaultProps = {
  lang: 'en',
  description: '',
  featuredImagePath: '',
  index: false
};

SEO.defaultProps = defaultProps;

export default function SEO({
  description,
  lang,
  title,
  featuredImagePath,
  index
}: Props) {
  const metaDescription =
    description ||
    'Exploring the vast coding landscape with fun learning adventures';

  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Danny Libin" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {featuredImagePath && (
        <meta
          property="og:image"
          content={`https://questsincode.com${featuredImagePath}`}
        />
      )}
      {featuredImagePath && (
        <meta
          name="twitter:image"
          content={`https://questsincode.com${featuredImagePath}`}
        />
      )}
      {index ? <link href="mailto:dlibinrx@gmail.com" rel="me" /> : null}
      <link
        rel="webmention"
        href="https://webmention.io/questsincode.com/webmention"
      />
      <link
        rel="pingback"
        href="https://webmention.io/questsincode.com/xmlrpc"
      />
    </Head>
  );
}
