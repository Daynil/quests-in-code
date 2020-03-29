import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { BlogPostBySlugQuery } from '../../../graphql-types';
import Layout from '../layout';
import SEO from '../seo';
import TextLink from '../text-link';
import './blog-post.css';

export default function BlogPost(props: { data: BlogPostBySlugQuery }) {
  const { excerpt, body, frontmatter, timeToRead } = props.data.mdx;
  // const { previous, next } = props.pageContext;

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
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || excerpt}
        />
        <div className="mt-12">
          <div className="text-center">
            <div className="text-blue-500 font-semibold">{tagString}</div>
            <h1 className="mb-2">{frontmatter.title}</h1>
            <div className="mb-8 text-gray-700">
              <span>{frontmatter.date} • </span>
              <span>{timeToRead} minute read</span>
            </div>
          </div>
          <MDXRenderer>{body}</MDXRenderer>
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
