import React, { useRef } from 'react';
import CopyIcon from './svg/copy-icon';

type Props = {
  language: string;
  syntaxTokenizedHTMLString: string;
};

export default function CodeBlock({
  language,
  syntaxTokenizedHTMLString
}: Props) {
  const refCodeBlock = useRef<HTMLElement>(null);

  async function copyClick() {
    navigator.clipboard.writeText(refCodeBlock.current.innerText);
  }

  return (
    <div className="relative">
      <button
        className="absolute right-2 top-2"
        aria-label="copy code block"
        title="Copy code block"
        onClick={copyClick}
      >
        <CopyIcon className="w-6 text-gray-600 hover:text-gray-400 transition-colors" />
      </button>
      <pre className="remark-highlight">
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: syntaxTokenizedHTMLString }}
          ref={refCodeBlock}
        ></code>
      </pre>
    </div>
  );
}
