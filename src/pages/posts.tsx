import { graphql, Link } from 'gatsby';
import React from 'react';
import { PostsIndexPostsQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  path: string;
  data: PostsIndexPostsQuery;
};

export default ({ path, data }: Props) => (
  <Layout path={path}>
    <SEO title="Posts" />
    <div className="mt-20">
      {data.allMdx.edges.map(({ node }) => {
        let tagString = '';
        node.frontmatter.tags.forEach((tag, index) => {
          if (index === 0) tagString = tag;
          else tagString = `${tagString}, ${tag}`;
        });
        return (
          <div className="mt-12">
            <div className="text-dblue-500 font-semibold">{tagString}</div>
            <Link to={node.fields.slug}>
              <h2 className="my-2">{node.frontmatter.title}</h2>
              <div className="mb-8 text-gray-700 dk:text-gray-500">
                <span>{node.frontmatter.date} • </span>
                <span>{node.timeToRead} minute read</span>
              </div>
              <p className="-mt-2">{node.excerpt}</p>
            </Link>
          </div>
        );
      })}
    </div>
  </Layout>
);

export const query = graphql`
  query PostsIndexPosts {
    allMdx {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            date
            description
            title
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
