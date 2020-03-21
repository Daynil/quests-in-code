const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypePrism = require('rehype-prism');
const rehypeStringify = require('rehype-stringify');
const fs = require('fs');
const { slash } = require('gatsby-core-utils');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const markdownPages = await graphql(`
    query {
      allBlogHtml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  markdownPages.data.allBlogHtml.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.slug
      }
    });
  });
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const contentDir = fs.readdirSync('./content/');

  contentDir.forEach(mdFilePath => {
    const nodeData = {
      absolutePath: slash(require.resolve(`./content/${mdFilePath}`)),
      relativePath: mdFilePath
    };

    const nodeMetaData = {
      id: createNodeId(`id-${mdFilePath}`),
      parent: null,
      children: [],
      internal: {
        type: 'BlogMDFile',
        mediaType: 'text/markdown',
        contentDigest: createContentDigest(nodeData)
      }
    };

    createNode(Object.assign({}, nodeData, nodeMetaData));
  });

  return;
};

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions;
  if (node.internal.mediaType !== 'text/markdown') return;

  console.log('node: ', node);

  const content = await fs.readFileSync(node.absolutePath);
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content, function(err, file) {
      if (err) console.error(err);
      console.log(String(file));

      const htmlNodeData = {
        html: String(file),
        slug: `/${node.relativePath.replace(/\.[^/.]+$/, '')}`
      };

      const htmlNodeMetaData = {
        id: createNodeId(`id-html-${node.absolutePath}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'BlogHTML',
          mediaType: 'text/html',
          contentDigest: createContentDigest(String(file))
        }
      };

      const htmlNode = Object.assign({}, htmlNodeData, htmlNodeMetaData);

      createNode(htmlNode);
      createParentChildLink({ parent: node, child: htmlNode });
    });
};
