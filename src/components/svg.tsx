import React, { useEffect, useState } from 'react';

type Props = {
  url: string;
  className?: string;
};

const SVG = ({ url, className }: Props) => {
  const [svg, setSvg] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(svgString => {
        let modSvg = svgString.replace(/class="(.*?)"/gim, '');
        if (className) {
          const svgTag = '<svg';
          const svgTagIdx = modSvg.indexOf(svgTag);
          modSvg = `${modSvg.substr(
            0,
            svgTagIdx + svgTag.length
          )} class="${className}" ${modSvg.substr(
            svgTagIdx + svgTag.length,
            modSvg.length
          )}`;
        }
        setSvg(modSvg);
      });
  }, [url]);
  return <span dangerouslySetInnerHTML={{ __html: svg }}></span>;
};

export default SVG;
