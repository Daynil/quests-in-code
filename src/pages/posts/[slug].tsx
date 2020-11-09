import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import fs from 'fs';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/Link';
import { join } from 'path';
import React, { useEffect, useState } from 'react';
import highlight from 'rehype-highlight';
import visit from 'unist-util-visit';
import SEO from '../../components/seo';
import CommentsIcon from '../../components/svg/comments-icon';
import LikeIcon from '../../components/svg/like-icon';
import RetweetIcon from '../../components/svg/retweet-icon';
import TwitterIcon from '../../components/svg/twitter-icon';
import TextLink from '../../components/text-link';
import { humanDateFromEpoch } from '../../utils/format';
import { PostMatter } from '../posts';

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

function BlogImage({ src }: { src: string }) {
  let modifiedSrc = src;
  const router = useRouter();
  if (!router) return null;
  const postSlug = router.asPath.split('/')[2];
  // If relative path, replace with static folder associated with post
  if (src.startsWith('.')) {
    modifiedSrc = `/images/posts/${postSlug}/${src.split('./')[1]}`;
  }
  return <img src={modifiedSrc} />;
}

const mdxComponents = {
  a: TextLink,
  img: BlogImage
};

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

  const hearts: JSX.IntrinsicElements['img'][] = [];
  //for (let i = 0; i < Math.ceil(timeToRead / 3); i++) {
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
                (mention.data.author.url === 'https://twitter.com/mxbck'
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
    <div>
      <SEO title={post.title} description={post.description} />
      <div className="mt-24">
        <div className="text-center">
          <div className="flex flex-wrap justify-center">{postTags}</div>
          <h1 className="my-2">{post.title}</h1>
          <div className="mb-8 text-gray-700 dk:text-gray-500 flex justify-center flex-col sm:flex-row sm:text-center">
            <span className="mr-2">
              {format(new Date(post.date), 'MMMM d, yyyy')}{' '}
              <span className="hidden sm:inline-block">•</span>{' '}
            </span>
            <span className="flex items-center justify-center">
              <span className="flex mr-2">{hearts}</span> {3} minute read
            </span>
          </div>
        </div>
        <div className="w-full">
          <img
            className="z-0 rounded-md"
            src={`/images/posts/${post.slug}/featuredImage.png`}
            alt={post.title}
          />
        </div>
        <div className="mt-20">{hydratedPost}</div>
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
    </div>
  );
}

export async function getStaticPaths() {
  const folderNames = fs.readdirSync(
    join(process.cwd(), 'src', 'content', 'posts')
  );
  return {
    paths: folderNames.map(name => ({ params: { slug: name } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const fileContents = fs.readFileSync(
    join(process.cwd(), 'src', 'content', 'posts', params.slug, 'index.mdx'),
    'utf-8'
  );

  const matterResult = matter(fileContents);

  const mdxSource = await renderToString(matterResult.content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [
        function(options) {
          return tree =>
            visit(tree, 'code', (node, index) => {
              // Split off the title from the language and insert at title above the code
              const [languageHl, title] = ((node.lang || '') as string).split(
                ':title='
              );

              const hasHighlights = languageHl.match(/{(.*)}/gm);

              let language = languageHl;
              if (hasHighlights) {
                language = languageHl.replace(/{(.*)}/gm, '');
              }

              node.lang = language;

              if (title) {
                const className = 'remark-code-title';

                const titleNode = {
                  type: 'html',
                  value: `<div class="${className}">${title}</div>`.trim()
                };

                tree.children.splice(index, 0, titleNode);
              }
              // TODO Find and highlight lines if hasHighlights
            });
        }
      ],
      rehypePlugins: [highlight]
    }
  });
  return {
    props: {
      post: {
        slug: params.slug,
        source: mdxSource,
        ...(matterResult.data as PostMatter)
      }
    }
  };
}
