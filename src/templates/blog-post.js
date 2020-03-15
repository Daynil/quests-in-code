import { graphql } from 'gatsby';
import React from 'react';

export default function BlogPost({ data }) {
  return <div dangerouslySetInnerHTML={{ __html: data.blogHtml.html }}></div>;
}

export const query = graphql`
  query($slug: String!) {
    blogHtml(slug: { eq: $slug }) {
      html
    }
  }
`;
