import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { InferGetStaticPropsType } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import Link from 'next/Link';
import React, { useEffect, useState } from 'react';
import BlurImage from '../../components/blur-image';
import ReadHearts from '../../components/read-hearts';
import SEO from '../../components/seo';
import CommentsIcon from '../../components/svg/comments-icon';
import LikeIcon from '../../components/svg/like-icon';
import RetweetIcon from '../../components/svg/retweet-icon';
import TwitterIcon from '../../components/svg/twitter-icon';
import TextLink from '../../components/text-link';
import { mdxComponents } from '../../utils/constants';
import { humanDateFromEpoch } from '../../utils/helpers';
import { getPostBySlug, getPostSlugs } from '../../utils/mdx-api';

interface Webmention {
  source: string;
  verified: boolean;
  verified_date: string;
  id: number;
  private: boolean;
  data: {
    author: {
      name: string;
      url: string;
      photo: string;
    };
    /** url link to the posting location (e.g. Twitter post) */
    url: string;
    name: string | null;
    /** The full content of the mention, applicable only to reply type? */
    content: string | null;
    /** Only replies have publish dates */
    published: string | null;
    published_ts: number | null;
  };
  activity: {
    type: 'link' | 'like' | 'reply' | 'repost' | 'mention' | 'bookmark';
    sentence: 'string';
    sentence_html: 'string';
  };
  target: string;
}

export default function BlogPost({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [webmentions, setWebmentions] = useState<Webmention[]>(null);

  const postUrl = `https://questsincode.com/posts/${post.slug}/`;
  const twitterShareUrl = `https://twitter.com/share?url=${postUrl}&text=“${post.title}”, a post from Danny Libin.&via=Dayn1l`;
  const twitterSearchUrl = `https://twitter.com/search?q=${postUrl}/`;

  const hydratedPost = hydrate(post.source, { components: mdxComponents });

  useEffect(() => {
    async function getWebmentions() {
      try {
        const res = await (
          await fetch(
            `https://webmention.io/api/mentions.json?per-page=1000&page=0&target=${postUrl}`
          )
        ).json();
        setWebmentions(res.links);
      } catch (e) {
        console.log('Failed to get webmentions', e);
      }
    }
    getWebmentions();
  }, []);

  const postTags = !post.tags.length
    ? null
    : post.tags.map((tag, index) => (
        <Link key={index} href={`/topics?topic=${tag}`}>
          <span
            className={
              'py-1 px-4 ml-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700'
            }
          >
            {tag}
          </span>
        </Link>
      ));

  const webmentionContent = !webmentions
    ? null
    : webmentions
        .filter((mention, i) => {
          const isComment =
            mention.activity?.type === 'link' ||
            mention.activity?.type === 'reply';
          const hasAuthor =
            mention.data?.author?.name &&
            mention.data?.author?.photo &&
            mention.data?.author?.url;
          return isComment && hasAuthor;
        })
        .sort((a, b) => {
          if (!a.data.published_ts || !b.data.published_ts) return 999;
          return a.data.published_ts - b.data.published_ts;
        })
        .map((mention, i) => {
          const longMention = mention.data.content.length > 1000;
          return (
            <div
              key={i}
              className={
                'flex justify-between mt-6 p-2' +
                (mention.data.author.url === 'https://twitter.com/Dayn1l'
                  ? ' rounded-md bg-gray-200 dk:bg-gray-800'
                  : '')
              }
            >
              <div className="w-1/12 mt-1">
                <a href={mention.data.url} target="_blank">
                  <img
                    src={mention.data.author.photo}
                    alt={mention.data.author.name}
                    className="rounded-full w-12"
                  />
                </a>
              </div>
              <div className="w-11/12">
                <div>
                  <TextLink href={mention.data.url}>
                    <span>{mention.data.author.name}</span>
                  </TextLink>{' '}
                  ⋅{' '}
                  <span className="text-gray-700 dk:text-gray-500 text-base">
                    {humanDateFromEpoch(mention.data.published_ts)}
                  </span>
                </div>
                <div
                  className="mt-1 comments-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      longMention
                        ? mention.activity.sentence_html
                        : mention.data.content
                    )
                  }}
                ></div>
              </div>
            </div>
          );
        });

  return (
    <section>
      <SEO
        title={post.title}
        description={post.description}
        featuredImagePath={
          post.featuredImageMeta && post.featuredImageMeta.relativePath
        }
      />
      <div className="mt-24">
        <header>
          <div className="text-center">
            <div className="flex flex-wrap justify-center">{postTags}</div>
            <h1 className="my-2">{post.title}</h1>
            <div className="mb-8 text-gray-700 dk:text-gray-500 flex justify-center flex-col sm:flex-row sm:text-center">
              <span className="mr-2">
                {format(new Date(post.date), 'MMMM d, yyyy')}{' '}
                <span className="hidden sm:inline-block">•</span>{' '}
              </span>
              <span className="flex items-center justify-center">
                <span className="flex mr-2">
                  <ReadHearts readTimeMins={post.timeToRead} />
                </span>{' '}
                {post.timeToRead} minute read
              </span>
            </div>
          </div>
          {!post.featuredImageMeta ? null : (
            <div className="lg:-mx-16 mt-16">
              <BlurImage
                className="z-0 rounded-md"
                alt={post.title}
                {...post.featuredImageMeta}
              />
            </div>
          )}
        </header>
        <article className="mt-16">{hydratedPost}</article>
        <a
          href={twitterShareUrl}
          target="_blank"
          className="flex flex-row mt-12"
        >
          <TwitterIcon className="text-dblue-500 hover:text-dblue-300 transition-colors ease-in-out duration-300 w-24" />
          <span className="ml-4 p-4 bg-dblue-200 dk:bg-dblue-800 text-dblue-800 dk:text-dblue-200 text-2xl rounded-md">
            Found this article useful? Click to share, discuss and spread the
            word!! 🎉
          </span>
        </a>
        <h2>
          Webmentions (
          <TextLink
            href="https://indieweb.org/Webmention"
            className="text-lg border-b-0"
          >
            ❔
          </TextLink>
          )
        </h2>
        {!webmentions || !webmentions.length ? (
          <div>
            No comments yet.{' '}
            <TextLink href={twitterShareUrl}>Start the conversation!</TextLink>{' '}
            Your post will show up here.
          </div>
        ) : (
          <div className="mt-10">
            <a href={twitterSearchUrl} target="_blank">
              <div className="flex">
                <div className="flex">
                  <LikeIcon className="w-6 text-red-600" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        mention => mention.activity.type === 'like'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex ml-6">
                  <RetweetIcon className="w-8 text-blue-500" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        mention => mention.activity.type === 'repost'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex ml-6">
                  <CommentsIcon className="w-6 text-blue-500" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        mention => mention.activity.type === 'reply'
                      ).length
                    }
                  </span>
                </div>
              </div>
            </a>
            <div className="mt-6">
              <TextLink href={twitterSearchUrl}>
                Join the conversation!
              </TextLink>
            </div>
            <div className="mt-6">{webmentionContent}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map(slug => ({ params: { slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post
    }
  };
}
