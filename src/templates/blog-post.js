import { graphql } from 'gatsby';
import React from 'react';

export default function BlogPost({ data }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;
