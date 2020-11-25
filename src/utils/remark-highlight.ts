import { Node } from 'hast';
import hljs from 'highlight.js';
import visit from 'unist-util-visit';

export function highlightCodeBlock() {
  return transformer;

  function transformer(tree: Node) {
    visit(tree, 'code', visitor);

    function visitor(node: Node, index: number) {
      // Split off the title from the language and insert at title above the code
      const [languageHl, title] = ((node.lang || '') as string).split(
        ':title='
      );

      const languageHlRegex = /{(.*)}/gm;

      const hasHighlights = languageHl.match(languageHlRegex);

      let language = languageHl;
      if (hasHighlights) {
        language = languageHl.replace(languageHlRegex, '');
      }

      node.lang = language;

      if (title) {
        const className = 'remark-code-title';

        const titleNode = {
          type: 'html',
          value: `<div class="${className}">${title}</div>`.trim()
        };

        (tree.children as Node[]).splice(index, 0, titleNode);
      }

      let syntaxTokenizedHTMLString = '';

      if (!hasHighlights) {
        syntaxTokenizedHTMLString = hljs.highlight(
          language,
          node.value as string
        ).value;
      } else {
        // Intake is a string of text representing code
        // Split by newline so we can isolate which lines to highlight
        const codeLineArray = (node.value as string).split('\n');

        // Extract the list of rows to highlight using the {2,17-24} syntax
        // E.g. javascript{2,17-24} = highlight lines 2, and 17-24
        const hlLines = languageHlRegex
          .exec(languageHl)[1]
          .split(',') // [ '2', '17-24' ]
          .map(rowString => {
            if (rowString.includes('-')) {
              // Range highlight =>  17-24
              const [start, end] = rowString.split('-');
              // Subtract 1 since we'll use a 0-based array
              return {
                start: parseInt(start) - 1,
                end: parseInt(end) - 1
              };
            } else {
              // Single line highlight => 2
              return {
                start: parseInt(rowString) - 1,
                end: parseInt(rowString) - 1
              };
            }
          });

        // [ { start: 2, end: 2 }, { start: 17, end: 24 } ]
        // We could probably do this using .reduce above
        // ...but it's too hard to read, so good 'ol for loop it is
        let highlightLineNumArr: number[] = [];
        for (const lines of hlLines) {
          for (let i = lines.start; i <= lines.end; i++) {
            highlightLineNumArr.push(i);
          }
        }

        // Run each line through highlight.js
        // Wrap any lines with highlight (i.e. lighter color highlight) requested in a span with highlight class
        const highlightedCodeLineArray = codeLineArray.map((codeLine, i) => {
          const language = languageHl.replace(languageHlRegex, '');
          const highlightedLine = hljs.highlight(language, codeLine).value;
          if (highlightLineNumArr.includes(i)) {
            return `<span class="remark-highlight-code-line">${highlightedLine}</span>`;
          }
          return highlightedLine;
        });

        // Rejoin lines with line break since we are expected to return a single string
        syntaxTokenizedHTMLString = highlightedCodeLineArray.join('\n');
      }

      node.type = 'html';
      node.value = `<pre class="remark-highlight"><code class="hljs language-${language}">${syntaxTokenizedHTMLString}</code></pre>`;
    }
  }
}
