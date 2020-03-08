const remark = require('remark');
const html = require('remark-html');
const fs = require('fs');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const post1 = fs.readFileSync(require.resolve('./content/level-one.md'));

  remark()
    .use(html)
    .process(post1, function(err, file) {
      if (err) console.error(err);
      console.log(String(file));
    });
};
