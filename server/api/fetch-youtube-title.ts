import { H3Event } from 'h3';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== 'string') {
    return { error: 'Invalid URL' };
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/);

    if (titleMatch) {
      return { title: titleMatch[1].replace(' - YouTube', '') };
    } else {
      return { error: 'Could not extract title' };
    }
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
});
