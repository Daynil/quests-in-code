const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypePrism = require('rehype-prism');
const rehypeStringify = require('rehype-stringify');
const fs = require('fs');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const contentDir = fs.readdirSync('./content/');

  contentDir.forEach(mdFile => {
    const post = fs.readFileSync(require.resolve(`./content/${mdFile}`));

    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(post, function(err, file) {
        if (err) console.error(err);
        console.log(String(file));
        createPage({
          path: `/${mdFile.replace(/\.[^/.]+$/, '')}`,
          component: require.resolve('./src/templates/blog-post.js'),
          context: {
            post: String(file)
          }
        });
      });
  });
};
