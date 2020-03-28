import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { BlogPostBySlugQuery } from '../../../graphql-types';
import Layout from '../layout';
import SEO from '../seo';
import './blog-post.css';

export default function BlogPost(props: { data: BlogPostBySlugQuery }) {
  const { excerpt, body, frontmatter } = props.data.mdx;
  // const { previous, next } = props.pageContext;

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || excerpt}
      />
      <div className="mt-12">
        <h1 className="text-blue-600">{frontmatter.title}</h1>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
