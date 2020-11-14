import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/Link';
import { join } from 'path';
import React, { useState } from 'react';
import SEO from '../components/seo';
import { PostMatter } from './posts';

export default function Topics({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let tagList: string[] = [];
  posts.map(post => (tagList = tagList.concat(post.tags)));
  tagList = [...new Set(tagList)];
  tagList.sort();
  tagList.unshift('All');

  const router = useRouter();

  let initialTopic = 'All';
  if (router.query) {
    initialTopic = router.query.topic as string;
    initialTopic = tagList.find(tag => tag === initialTopic);
    if (!initialTopic) initialTopic = 'All';
  }

  const [selectedTag, setSelectedTag] = useState(initialTopic);

  const filteredPosts =
    selectedTag === 'All'
      ? posts
      : posts.filter(post => post.tags.find(tag => tag === selectedTag));

  return (
    <div>
      <SEO title="Topics - Quests In Code" />
      <div className="mt-20 text-center">
        <h1>Explore posts by topic</h1>
      </div>
      <div className="text-center flex flex-wrap">
        {tagList.map((tag, index) => (
          <span
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={
              'my-1 py-1 px-4 ml-4 font-semibold tracking-wider rounded-full cursor-pointer transition duration-200 ease-in-out ' +
              (tag === selectedTag
                ? 'bg-dblue-600 text-dblue-100'
                : 'bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700')
            }
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-20">
        {filteredPosts.map((post, index) => {
          const hearts: JSX.IntrinsicElements['img'][] = [];
          //for (let i = 0; i < Math.ceil(node.timeToRead / 3); i++) {
          for (let i = 0; i < 3; i++) {
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

          return (
            <div key={index} className="mt-12">
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h2 className="my-2">{post.title}</h2>
                  <div className="mb-8 text-gray-700 dk:text-gray-500 flex flex-col sm:flex-row sm:text-center">
                    <span className="mr-2">
                      {format(new Date(post.date), 'MMMM d, yyyy')}{' '}
                      <span className="hidden sm:inline-block">•</span>{' '}
                    </span>
                    <span className="flex items-center">
                      <span className="flex mr-2">{hearts}</span> {3} minute
                      read
                    </span>
                  </div>
                  <p className="-mt-2">{post.description}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const mdxFileNames = fs.readdirSync(join(process.cwd(), 'src', '_posts'));

  const allPostsMeta = mdxFileNames.map(name => {
    const fileContents = fs.readFileSync(
      join(process.cwd(), 'src', '_posts', name),
      'utf-8'
    );
    const matterResult = matter(fileContents);
    return {
      slug: name.replace('.mdx', ''),
      ...(matterResult.data as PostMatter)
    };
  });

  return {
    props: { posts: allPostsMeta.sort((a, b) => (a.date < b.date ? 1 : -1)) }
  };
}
