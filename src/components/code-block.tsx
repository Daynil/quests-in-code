import React, { useRef, useState } from 'react';
import CheckIcon from './svg/check-icon';
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
  const [copied, setCopied] = useState(false);

  async function copyClick() {
    navigator.clipboard.writeText(refCodeBlock.current.innerText).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }

  return (
    <div className="relative">
      <button
        className="absolute right-2 top-2"
        aria-label="copy code block"
        title="Copy code block"
        onClick={copyClick}
      >
        {copied ? (
          <CheckIcon className="w-6 text-gray-600 hover:text-gray-400 transition-colors" />
        ) : (
          <CopyIcon className="w-6 text-gray-600 hover:text-gray-400 transition-colors" />
        )}
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
