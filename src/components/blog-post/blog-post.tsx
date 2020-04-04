import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { BlogPostBySlugQuery } from '../../../graphql-types';
import Layout from '../layout';
import SEO from '../seo';
import TextLink from '../text-link';
import './blog-post.css';

type Props = {
  path: string;
  data: BlogPostBySlugQuery;
};

export default function BlogPost(props: Props) {
  const { excerpt, body, frontmatter, timeToRead } = props.data.mdx;
  // const { previous, next } = props.pageContext;

  console.log(props);

  let tagString = '';
  frontmatter.tags.forEach((tag, index) => {
    if (index === 0) tagString = tag;
    else tagString = `${tagString}, ${tag}`;
  });

  return (
    <MDXProvider
      components={{
        a: TextLink
      }}
    >
      <Layout path={props.path}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || excerpt}
        />
        <div className="mt-12">
          <div className="text-center">
            <div className="text-dblue-500 font-semibold">{tagString}</div>
            <h1 className="my-2">{frontmatter.title}</h1>
            <div className="mb-8 text-gray-700 dk:text-gray-500">
              <span>{frontmatter.date} • </span>
              <span>{timeToRead} minute read</span>
            </div>
          </div>
          <div className="mt-12">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </Layout>
    </MDXProvider>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
