import React, { useState } from 'react';
import { ImageMeta } from '../pages/posts';

export default function BlurImage({ imageMeta }: { imageMeta: ImageMeta }) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <a href={`http://localhost:3000${imageMeta.relativePath}`} target="_blank">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          aria-hidden="true"
          src={imageMeta.imgBase64}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(2rem)',
            transform: 'scale(1.2)',
            opacity: isLoaded ? '0' : '1',
            transition: 'opacity 0s ease',
            transitionDelay: '300ms'
          }}
        />
        <img
          src={imageMeta.relativePath}
          width={imageMeta.width}
          height={imageMeta.height}
          onLoad={() => setLoaded(true)}
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
