import React from 'react';

export default function BlogPost({ pageContext }) {
  return <div dangerouslySetInnerHTML={{ __html: pageContext.post }}></div>;
}
