import { Link } from 'gatsby';
import React from 'react';

type Props = React.PropsWithRef<JSX.IntrinsicElements['a']>;

export default function TextLink({
  href,
  target,
  rel,
  children,
  ...delegated
}: Props) {
  const external = href.match(/(^http|^mailto)/i);

  // Open external links in a new tab
  if (typeof target === 'undefined') target = external ? '_blank' : '_self';

  // External links should have noopener for security
  // Prevents the new page from being able to access to window.opener
  if (external) rel = 'noopener';

  return external ? (
    <a href={href} rel={rel} target={target} {...delegated}>
      {children}
    </a>
  ) : (
    <Link to={href}>{children}</Link>
  );
}
