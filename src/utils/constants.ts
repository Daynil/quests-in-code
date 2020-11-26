import BlurImage from '../components/blur-image';
import TextLink from '../components/text-link';

export const mdxComponents = {
  a: TextLink,
  BlurImage: BlurImage
};

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://questsincode.com'
    : 'http://localhost:3000';
