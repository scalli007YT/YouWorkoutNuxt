import { H3Event } from 'h3';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const { url } = getQuery(event);

  // Ensure the URL is valid
  if (!url || typeof url !== 'string') {
    return { error: 'Invalid URL' };
  }

  // URL encode to ensure any special characters are handled
  const encodedUrl = encodeURIComponent(url);

  console.log('Fetching URL:', encodedUrl); // Log URL to help debug

  try {
    // Fetch the URL
    const response = await fetch(decodeURIComponent(encodedUrl));  // Decode back for use in fetch
    console.log('Response Status:', response.status); // Log response status

    // Check if the request was successful
    if (!response.ok) {
      return { error: `Failed to fetch page. Status: ${response.status}` };
    }

    // Extract the page content
    const html = await response.text();

    // Try to extract the title from the HTML
    const titleMatch = html.match(/<title>(.*?)<\/title>/);

    if (titleMatch) {
      // Remove " - YouTube" from the title if present
      return { title: titleMatch[1].replace(' - YouTube', '') };
    } else {
      return { error: 'Could not extract title' };
    }
  } catch (error) {
    // Log and return the error if the fetch fails
    console.log('Error fetching URL:', error);
    return { error: 'Failed to fetch page' };
  }
});
