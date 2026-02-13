import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {

    const blogPosts = await getCollection('blog');

  return rss({
    // stylesheet: '/styles/rss.xsl',
    title: 'Practice\'s Blog',
    description: 'My blog to practice Astro',
    site,
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    items: blogPosts.map( ({data, body, slug}) => ({
        title: data.title,
        link: `/posts/${slug}`,
        pubDate: data.date,
        description: data.description,
        content: sanitizeHtml(parser.render(body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          }),
          
          customData: `<media:content
              type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
              width="${data.image.width}"
              height="${data.image.height}"
              medium="image"
              url="${site + data.image.src}" />
          `,
    })),
    customData: '<language>es-ES</language>',
  })
};

