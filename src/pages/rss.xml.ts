import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params, request, site }) => {

    const blogPosts = await getCollection('blog');

  return rss({
    // stylesheet: '/styles/rss.xsl',
    title: 'Practice\'s Blog',
    description: 'My blog to practice Astro',
    site,
    items: blogPosts.map( ({data, body, slug}) => ({
        title: data.title,
        link: `/posts/${slug}`,
        pubDate: data.date,
        description: data.description,
        content: body,
    })),
    customData: '<language>es-ES</language>',
  })
};

