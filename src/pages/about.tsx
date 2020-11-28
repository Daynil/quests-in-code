import React from 'react';
import SEO from '../components/seo';
import TextLink from '../components/text-link';

export default function About() {
  return (
    <div>
      <SEO title="About - Quests In Code" />
      <h1 className="mt-20 text-center">About Quests In Code</h1>
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
