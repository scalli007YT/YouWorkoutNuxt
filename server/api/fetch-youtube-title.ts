import { H3Event } from 'h3';
import { defineEventHandler, getQuery } from 'h3';

const API_KEY = process.env.NUXT_YOUTUBE_API_KEY;

export default defineEventHandler(async (event: H3Event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== 'string') {
    return { error: 'Invalid URL' };
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    return { error: 'Invalid YouTube URL' };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return { title: data.items[0].snippet.title };
    } else {
      return { error: 'Video not found' };
    }
  } catch (error) {
    console.error('YouTube API error:', error);
    return { error: 'Failed to fetch title' };
  }
});

function extractVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^/?]+)/);
  return match ? match[1] : null;
}
