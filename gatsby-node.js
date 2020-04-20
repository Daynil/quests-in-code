const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const fs = require('fs');

/** @type { import("gatsby").GatsbyNode["createPages"] } */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const mdxPages = await graphql(`
    query AllMdxPages {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
  `);

  // Create a page for each post
  // Also stash metadata about each post in a JSON file for use by person site post index
  const posts = mdxPages.data.allMdx.edges;
  let postsMetadata = [];
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/components/blog-post/blog-post.tsx'),
      context: {
        slug: post.node.fields.slug,
        featuredImage: `${post.node.fields.slug}featuredImage.png/`,
        previous,
        next
      }
    });
    postsMetadata.push({
      excerpt: post.node.excerpt,
      timeToRead: post.node.timeToRead,
      date: post.node.frontmatter.date,
      description: post.node.frontmatter.description,
      title: post.node.frontmatter.title,
      tags: post.node.frontmatter.tags,
      slug: post.node.fields.slug
    });
  });

  fs.writeFileSync(
    './public/postsMetaData.json',
    JSON.stringify(postsMetadata)
  );
};

/** @type { import("gatsby").GatsbyNode["onCreateNode"] } */
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: `/posts${slug}`
    });
  }
};

// For debugging purposes
/** @type { import("gatsby").GatsbyNode["onCreateWebpackConfig"] } */
exports.onCreateWebpackConfig = ({ actions }) => {
  if (process.env.NODE_ENV === 'development') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map'
    });
  }
};
