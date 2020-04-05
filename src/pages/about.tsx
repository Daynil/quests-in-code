import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TextLink from '../components/text-link';
import Moon from '../content/assets/svgs/moon-stars-duotone.svg';

type Props = {
  path: string;
};

const About = ({ path }: Props) => {
  console.log(Moon);
  return (
    <Layout path={path}>
      <SEO title="About" />
      <h1 className="mt-20 text-center">About JS Adventures</h1>
      <p>
        Javascript Adventures is a place to explore the expansive world of
        Javascript. Javascript has become much more than a tool for web
        development. You can build pretty much anything with it, only your
        imagination is the limit! So don your cloak and equip your leather
        jerkin, and let's venture into the world of Javascript! ⚔️🤠🛡️
      </p>
      <p>
        Written and created by{' '}
        <TextLink href="https://dlibin.net">Danny Libin</TextLink>
      </p>
    </Layout>
  );
};

export default About;
