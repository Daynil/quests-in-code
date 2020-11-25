import chalk from 'chalk';
import { Node } from 'hast';
import visit from 'unist-util-visit';
import { ImageMeta } from '../pages/posts';

export function blurImage(imgMeta: ImageMeta) {
  if (!imgMeta) {
    console.error(
      chalk.cyan('RemarkBlurImage - ') + chalk.red('Image meta required!')
    );
  }
  return transformer;

  function transformer(tree: Node) {
    visit(tree, 'image', visitor);

    function visitor(node: Node) {
      if (!imgMeta) return;
      const meta = imgMeta[(node.url as string).split('./')[1]];
      if (!meta) return;

      node.type = 'jsx';
      node.value = `<BlurImage
                      fileName="${meta.fileName}"
                      relativePath="${meta.relativePath}"
                      width={${meta.width}}
                      height={${meta.height}}
                      imgBase64="${meta.imgBase64}" />`;
    }
  }
}
