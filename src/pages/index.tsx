import { graphql, Link } from 'gatsby';
import React from 'react';
import { PostsIndexQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  path: string;
  data: PostsIndexQuery;
};

export default ({ path, data }: Props) => (
  <Layout path={path}>
    <SEO title="Home" />
    <div className="mt-20 text-center">
      <h1>Adventures in Javascript Development</h1>
      <p className="text-xl -mt-4">
        Create and explore awesome stuff with Javascript
      </p>
      <p className="-mt-4">Bring your adventurous spirit! 🏹</p>
    </div>
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
  query PostsIndex {
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
