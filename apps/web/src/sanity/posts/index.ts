import { groq } from "next-sanity";

import { sanityFetch } from "../client";
import { slugSchema } from "../utils/slug";
import { postSchema, type Post } from "./schemas";

export * from "./schemas";

/**
 * Get all slugs for posts.
 * @returns an array of slugs
 */
export async function fetchPostParams() {
  const query = groq`*[_type == "post"]{ "slug": slug.current }`;
  const result = await sanityFetch<Array<string>>({
    query,
    tags: ["post-params"],
  });

  const slugs = slugSchema
    .array()
    .parse(result)
    .map((nestedSlug) => nestedSlug.slug);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Get the n last published posts.
 * @param n how many posts to retrieve
 */
export async function fetchPosts(n: number) {
  const query = groq`
*[_type == "post" && !(_id in path('drafts.**'))] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "authors": authors[]->{
    _id,
    name,
    image,
  },
  image,
  body
}[0...$n]
  `;

  const params = {
    n,
  };

  const result = await sanityFetch<Array<Post>>({
    query,
    params,
    tags: ["posts"],
  });

  return postSchema.array().parse(result);
}

/**
 * Get the posts for a given page. Default page size is 10
 * @param page page number to retrieve
 * @param pageSize number of posts per page
 * @returns an object with the posts and if there are more posts to retrieve
 */
export async function fetchPostsByPage(page: number, pageSize = 10) {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  const query = groq`
*[_type == "post" && !(_id in path('drafts.**'))]| order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "authors": authors[]->{
    _id,
    name,
    image,
  },
  image,
  body
}[$start...$end]
  `;

  const params = {
    start,
    end,
  };

  const result = await sanityFetch<Array<Post>>({
    query,
    params,
    tags: [`posts-page-${page}`],
  });

  const posts = postSchema.array().parse(result);

  const hasMore = posts.length === pageSize;

  return {
    posts,
    hasMore,
  };
}

export async function fetchPostBySlug(slug: string) {
  const query = groq`
*[_type == "post"
  && slug.current == $slug
  && !(_id in path('drafts.**'))]
  | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "authors": authors[]->{
    _id,
    name,
    image,
  },
  image,
  body
}[0]
      `;

  const params = {
    slug,
  };

  const result = await sanityFetch<Post | null>({
    query,
    params,
    tags: [`post-${slug}`],
  });

  if (!result) {
    return null;
  }

  return postSchema.parse(result);
}
