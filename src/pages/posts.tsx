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
      {data.allMdx.edges.map(({ node }, index) => {
        const postTags = !node.frontmatter.tags.length
          ? null
          : node.frontmatter.tags.map((tag, index) => (
              <Link to={'/topics'} state={{ topic: tag }}>
                <span
                  key={index}
                  className={
                    'py-1 px-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700' +
                    (index === 1 ? ' ml-4' : '')
                  }
                >
                  {tag}
                </span>
              </Link>
            ));
        return (
          <div className="mt-12" key={index}>
            <div className="mb-4">{postTags}</div>
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
