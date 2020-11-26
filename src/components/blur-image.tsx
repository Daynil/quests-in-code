import React, { useState } from 'react';
import { ImageMeta } from '../pages/posts';
import { baseUrl } from '../utils/constants';

export default function BlurImage({
  fileName,
  relativePath,
  width,
  height,
  imgBase64,
  className,
  alt
}: ImageMeta & { className?: string; alt?: string }) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <a href={`${baseUrl}${relativePath}`} target="_blank">
      <div
        className={
          'relative overflow-hidden' + (className ? ' ' + className : '')
        }
      >
        <img
          aria-hidden="true"
          src={imgBase64}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            filter: 'blur(2rem)',
            transform: 'scale(1.2)',
            opacity: isLoaded ? '0' : '1',
            transition: 'opacity 0s ease',
            transitionDelay: '300ms'
          }}
        />
        <img
          src={relativePath}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          alt={alt ? alt : ''}
          style={{
            opacity: isLoaded ? '1' : '0',
            transition: 'opacity 300ms ease'
          }}
          loading="lazy"
        />
      </div>
    </a>
  );
}
