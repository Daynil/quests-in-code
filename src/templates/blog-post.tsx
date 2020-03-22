import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function BlogPost(props: {
  data: GatsbyTypes.BlogPostBySlugQuery;
  pageContext: any;
}) {
  const post = props.data.markdownRemark;
  const { previous, next } = props.pageContext;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1 className="text-blue-600">Testing color</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
