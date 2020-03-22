const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

/** @type { import("gatsby").GatsbyNode["createPages"] } */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const markdownPages = await graphql(`
    query AllMarkdownPages {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const posts = markdownPages.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    });
  });
};

/** @type { import("gatsby").GatsbyNode["onCreateNode"] } */
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${slug}`
    });
  }
};
