import fs from 'fs';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { join } from 'path';
import React from 'react';
import highlight from 'rehype-highlight';
import visit from 'unist-util-visit';
import Layout from '../components/layout';
import SEO from '../components/seo';

export type PostMatter = {
  title: string;
  tags: string[];
  date: string;
  description: string;
};

export default function Posts({ source }) {
  return (
    <Layout path={''}>
      <SEO title="Posts - Quests In Code" />
      <div className="mt-20">
        {hydrate(source)}
        {/* {data.allMdx.edges.map(({ node }, index) => {
        const hearts: JSX.IntrinsicElements['img'][] = [];
        for (let i = 0; i < Math.ceil(node.timeToRead / 3); i++) {
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

        const postTags = !node.frontmatter.tags.length
          ? null
          : node.frontmatter.tags.map((tag, index) => (
              <Link key={index} to={`/topics?topic=${tag}`} className="my-1">
                <span
                  className={
                    'py-1 px-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700' +
                    (index >= 1 ? ' ml-4' : '')
                  }
                >
                  {tag}
                </span>
              </Link>
            ));

        return (
          <div className="mt-12" key={index}>
            <div className="mb-4 flex flex-wrap">{postTags}</div>
            <Link to={node.fields.slug}>
              <h2 className="my-2">{node.frontmatter.title}</h2>
              <div className="mb-8 text-gray-700 dk:text-gray-500 flex flex-col sm:flex-row sm:text-center">
                <span className="mr-2">
                  {node.frontmatter.date}{' '}
                  <span className="hidden sm:inline-block">•</span>{' '}
                </span>
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
      })} */}
      </div>
    </Layout>
  );
}

// export const query = graphql`
//   query PostsIndexPosts {
//     allMdx(sort: { fields: frontmatter___date, order: DESC }) {
//       edges {
//         node {
//           excerpt
//           timeToRead
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             description
//             title
//             tags
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;

export async function getStaticProps() {
  const fileContents = fs.readFileSync(
    join(
      process.cwd(),
      'src',
      'content',
      'posts',
      // 'test.mdx'
      'create-api-from-static-site',
      'index.mdx'
    ),
    'utf-8'
  );

  const matterResult = matter(fileContents);

  const mdxSource = await renderToString(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [
        function(options) {
          return tree =>
            visit(tree, 'code', (node, index) => {
              const [language, title] = ((node.lang || '') as string).split(
                ':title='
              );
              if (!title) {
                return;
              }

              const className = 'remark-code-title';

              const titleNode = {
                type: 'html',
                value: `<div class="${className}">${title}</div>`.trim()
              };

              tree.children.splice(index, 0, titleNode);
              node.lang = language;
            });
        }
      ],
      rehypePlugins: [highlight]
    }
  });
  return {
    props: {
      source: mdxSource,
      ...(matterResult.data as PostMatter)
    }
  };
}
