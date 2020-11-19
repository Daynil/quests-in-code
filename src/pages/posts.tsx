import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/Link';
import { join } from 'path';
import React from 'react';
import SEO from '../components/seo';
import { getTimeToRead } from '../utils/helpers';

export type PostMatter = {
  title: string;
  tags: string[];
  date: string;
  description: string;
};

export interface ImageMeta {
  fileName: string;
  relativePath: string;
  width: number;
  height: number;
  imgBase64: string;
}

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO title="Posts - Quests In Code" />
      <div className="mt-20">
        {posts.map((post, index) => {
          const hearts: JSX.IntrinsicElements['img'][] = [];
          for (let i = 0; i < Math.ceil(post.timeToRead / 3); i++) {
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

          const postTags = !post.tags.length
            ? null
            : post.tags.map((tag, index) => (
                <Link key={index} href={`/topics?topic=${tag}`}>
                  <a
                    className={
                      'py-1 px-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700' +
                      (index >= 1 ? ' ml-4' : '')
                    }
                  >
                    {tag}
                  </a>
                </Link>
              ));

          return (
            <div className="mt-12" key={index}>
              <div className="mb-4 flex flex-wrap">{postTags}</div>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h2 className="my-2">{post.title}</h2>
                  <div className="mb-8 text-gray-700 dk:text-gray-500 flex flex-col sm:flex-row sm:text-center">
                    <span className="mr-2">
                      {format(new Date(post.date), 'MMMM d, yyyy')}{' '}
                      <span className="hidden sm:inline-block">•</span>{' '}
                    </span>
                    <span className="flex items-center">
                      <span className="flex mr-2">{hearts}</span>{' '}
                      {post.timeToRead} minute read
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
      timeToRead: getTimeToRead(matterResult.content.length),
      ...(matterResult.data as PostMatter)
    };
  });

  return {
    props: { posts: allPostsMeta.sort((a, b) => (a.date < b.date ? 1 : -1)) }
  };
}
