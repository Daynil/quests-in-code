import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import { PostsIndexTopicsQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import heart from '../content/assets/images/heart-large.png';

type Props = {
  path: string;
  data: PostsIndexTopicsQuery;
  location: {
    state: {
      topic?: string;
    };
  };
};

export default ({ path, data, location }: Props) => {
  const { edges } = data.allMdx;

  let tagList: string[] = [];
  edges.map(({ node }) => (tagList = tagList.concat(node.frontmatter.tags)));
  tagList.sort();
  tagList.unshift('All');

  const [selectedTag, setSelectedTag] = useState(
    typeof location.state !== 'undefined' && location.state.topic
      ? location.state.topic
      : 'All'
  );

  const filteredEdges =
    selectedTag === 'All'
      ? edges
      : edges.filter(({ node }) =>
          node.frontmatter.tags.find(tag => tag === selectedTag)
        );

  return (
    <Layout path={path}>
      <SEO title="Topics - JS Adventures" />
      <div className="mt-20 text-center">
        <h1>Explore posts by topic</h1>
      </div>
      <div className="text-center">
        {tagList.map((tag, index) => (
          <span
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={
              'py-1 px-4 ml-4 font-semibold tracking-wider rounded-full cursor-pointer transition duration-200 ease-in-out ' +
              (tag === selectedTag
                ? 'bg-dblue-600 text-dblue-100'
                : 'bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700')
            }
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-20">
        {filteredEdges.map(({ node }, index) => {
          const hearts: JSX.IntrinsicElements['img'][] = [];
          for (let i = 0; i < Math.ceil(node.timeToRead / 5); i++) {
            hearts.push(
              <img
                key={i}
                src={heart}
                alt="Pixel heart"
                style={{ height: '24px' }}
                className={i > 0 ? 'ml-1' : ''}
              />
            );
          }

          return (
            <div key={index} className="mt-12">
              <Link to={node.fields.slug}>
                <h2 className="my-2">{node.frontmatter.title}</h2>
                <div className="mb-8 text-gray-700 dk:text-gray-500 flex">
                  <span className="mr-2">{node.frontmatter.date} • </span>
                  <span className="flex items-center">
                    <span className="flex mr-2">{hearts}</span>{' '}
                    {node.timeToRead} minute read
                  </span>
                </div>
                <p className="-mt-2">
                  {node.frontmatter.description
                    ? node.frontmatter.description
                    : node.excerpt}
                </p>
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
            date(formatString: "MMMM DD, YYYY")
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
