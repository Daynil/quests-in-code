import fs from 'fs';
import { InferGetStaticPropsType } from 'next';
import { join } from 'path';
import React from 'react';
import BlurImage from '../components/blur-image';
import SEO from '../components/seo';
import TextLink from '../components/text-link';
import { ImageMeta } from './posts';

export default function About({
  imgMeta
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO title="About - Quests In Code" />
      <h1 className="mt-20 text-center">About Quests In Code</h1>
      <BlurImage {...imgMeta['cat-test.png']} />
      <p>
        Quests In Code is a place to explore the expansive world of software
        development. You can build pretty much anything, only your imagination
        is the limit! So don your cloak and equip your leather jerkin, and let's
        venture into the world of Code! ⚔️🤠🛡️
      </p>
      <p>
        Written and created by{' '}
        <TextLink href="https://dlibin.net">Danny Libin</TextLink>
      </p>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      imgMeta: JSON.parse(
        fs.readFileSync(
          join(process.cwd(), 'public', 'images', 'imgMeta.json'),
          'utf-8'
        )
      ) as { [key: string]: ImageMeta }
    }
  };
}
