import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { BlogPostBySlugQuery } from '../../../graphql-types';
import heart from '../../content/assets/images/heart-large.png';
import Layout from '../layout';
import SEO from '../seo';
import TwitterIcon from '../svg/twitter-icon';
import TextLink from '../text-link';
import './blog-post.css';

type Props = {
  path: string;
  data: BlogPostBySlugQuery;
  pageContext: {
    slug: string;
  };
};

const BlogPost = (props: Props) => {
  const { excerpt, body, frontmatter, timeToRead } = props.data.mdx;
  // const { previous, next } = props.pageContext;

  const twitterShareUrl = `https://twitter.com/share?url=https://questsincode.com${props.pageContext.slug}&text=“${frontmatter.title}”, a post from Danny Libin.&via=Dayn1l`;

  const hearts: JSX.IntrinsicElements['img'][] = [];
  for (let i = 0; i < Math.ceil(timeToRead / 5); i++) {
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

  const postTags = !frontmatter.tags.length
    ? null
    : frontmatter.tags.map((tag, index) => (
        <Link key={index} to={`/topics?topic=${tag}`}>
          <span
            className={
              'py-1 px-4 ml-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700'
            }
          >
            {tag}
          </span>
        </Link>
      ));

  return (
    <MDXProvider
      components={{
        a: TextLink
      }}
    >
      <Layout path={props.path}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || excerpt}
        />
        <div className="mt-24">
          <div className="text-center">
            <div>{postTags}</div>
            <h1 className="my-2">{frontmatter.title}</h1>
            <div className="mb-8 text-gray-700 dk:text-gray-500 flex justify-center">
              <span className="mr-2">{frontmatter.date} • </span>
              <span className="flex items-center">
                <span className="flex mr-2">{hearts}</span> {timeToRead} minute
                read
              </span>
            </div>
          </div>
          <div className="mt-20">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <a
            href={twitterShareUrl}
            target="_blank"
            className="flex flex-row mt-12"
          >
            <TwitterIcon className="text-dblue-500 hover:text-dblue-300 transition-colors ease-in-out duration-300 w-24" />
            <span className="ml-4 p-4 bg-dblue-200 dk:bg-dblue-800 text-dblue-800 dk:text-dblue-200 text-2xl rounded-md">
              Found this article useful? Please share it to spread the word!! 🎉
            </span>
          </a>
        </div>
      </Layout>
    </MDXProvider>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;

export default BlogPost;
