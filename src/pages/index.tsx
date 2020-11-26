import { format } from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/Link';
import React from 'react';
import ReadHearts from '../components/read-hearts';
import SEO from '../components/seo';
import { getPostsMeta } from '../utils/mdx-api';

export default function Home({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO
        title="Quests In Code - Create and explore with Code"
        description="Exploring the vast coding landscape with fun learning adventures"
        index={true}
      />
      <div className="mt-20 text-center">
        <h2 className="text-3xl">Create and explore awesome stuff with code</h2>
        <p className="-mt-4">Bring your adventurous spirit! 🏹</p>
      </div>

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

export function getStaticProps() {
  return {
    props: { posts: getPostsMeta() }
  };
}
