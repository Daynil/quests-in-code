import BlurImage from '../components/blur-image';
import { PiEstimatorChart } from '../components/charts/pi-estimator-chart';
import CodeBlock from '../components/code-block';
import TextLink from '../components/text-link';

export const mdxComponents = {
  a: TextLink,
  BlurImage: BlurImage,
  CodeBlock: CodeBlock,
  PiEstimatorChart: PiEstimatorChart
};

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://questsincode.com'
    : 'http://localhost:3000';
