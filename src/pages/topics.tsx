import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import { PostsIndexTopicsQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  path: string;
  data: PostsIndexTopicsQuery;
};

export default ({ path, data }: Props) => {
  const { edges } = data.allMdx;

  let tagList: string[] = [];
  edges.map(({ node }) => (tagList = tagList.concat(node.frontmatter.tags)));
  tagList.sort();
  tagList.unshift('All');

  const [selectedTag, setSelectedTag] = useState('All');

  const filteredEdges =
    selectedTag === 'All'
      ? edges
      : edges.filter(({ node }) =>
          node.frontmatter.tags.find(tag => tag === selectedTag)
        );

  return (
    <Layout path={path}>
      <SEO title="Topics" />
      <div className="mt-20 text-center">
        <h1>Explore posts by topic</h1>
      </div>
      <div>
        {tagList.map(tag => (
          <span
            onClick={() => setSelectedTag(tag)}
            className={
              'py-1 px-4 ml-4 font-semibold rounded-full cursor-pointer transition duration-200 ease-in-out ' +
              (tag === selectedTag
                ? 'bg-dblue-600 text-dblue-100'
                : 'bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-800')
            }
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-20">
        {filteredEdges.map(({ node }) => {
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
};

export const query = graphql`
  query PostsIndexTopics {
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
