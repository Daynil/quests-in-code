import { format } from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/Link';
import React from 'react';
import ReadHearts from '../components/read-hearts';
import SEO from '../components/seo';
import { getPostsMeta } from '../utils/mdx-api';

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
                      <span className="flex mr-2">
                        <ReadHearts readTimeMins={post.timeToRead} />
                      </span>{' '}
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
  return {
    props: { posts: getPostsMeta() }
  };
}
