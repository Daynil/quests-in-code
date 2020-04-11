import { graphql, Link } from 'gatsby';
import React from 'react';
import { PostsIndexIndexQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import heart from '../content/assets/images/heart-large.png';

type Props = {
  path: string;
  data: PostsIndexIndexQuery;
};

export default ({ path, data }: Props) => (
  <Layout path={path}>
    <SEO
      title="Javascript Adventures - Create and explore with Javascript"
      description="Exploring the vast javascript landscape with fun learning adventures"
    />
    <div className="mt-20 text-center">
      <h1>Adventures in Javascript Development</h1>
      <p className="text-xl -mt-4">
        Create and explore awesome stuff with Javascript
      </p>
      <p className="-mt-4">Bring your adventurous spirit! 🏹</p>
    </div>
    <div className="mt-20">
      {data.allMdx.edges.map(({ node }, index) => {
        const hearts: JSX.IntrinsicElements['img'][] = [];
        for (let i = 0; i < Math.ceil(node.timeToRead / 5); i++) {
          hearts.push(
            <img
              src={heart}
              alt="Pixel heart"
              style={{ height: '24px' }}
              className={i > 0 ? 'ml-1' : ''}
            />
          );
        }

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
              <div className="mb-8 text-gray-700 dk:text-gray-500 flex">
                <span className="mr-2">{node.frontmatter.date} • </span>
                <span className="flex items-center">
                  <span className="flex mr-2">{hearts}</span> {node.timeToRead}{' '}
                  minute read
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

export const query = graphql`
  query PostsIndexIndex {
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
