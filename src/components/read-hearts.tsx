import React from 'react';

type Props = {
  readTimeMins: number;
};

export default function ReadHearts({ readTimeMins }: Props) {
  let numHearts = Math.ceil(readTimeMins / 3);
  if (numHearts >= 10) numHearts = 10;
  const hearts: JSX.IntrinsicElements['img'][] = [];
  for (let i = 0; i < numHearts; i++) {
    hearts.push(
      <img
        key={i}
        src="/images/heart.png"
        alt="Pixel heart"
        style={{ height: '24px', imageRendering: 'pixelated' }}
        className={i > 0 ? 'ml-1' : ''}
      />
    );
  }
  return <>{hearts}</>;
}
