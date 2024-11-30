import { H3Event } from 'h3';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== 'string') {
    return { statusCode: 400, body: { error: 'Invalid URL' } }; // Proper status code and message format
  }

  // URL encode to ensure any special characters are handled
  const encodedUrl = encodeURIComponent(url);

  console.log('Fetching URL:', encodedUrl);

  try {
    // Fetch the URL
    const response = await fetch(decodeURIComponent(encodedUrl));
    console.log('Response Status:', response.status);

    // Check if the request was successful
    if (!response.ok) {
      return { statusCode: response.status, body: { error: `Failed to fetch page. Status: ${response.status}` } };
    }

    // Extract the page content
    const html = await response.text();

    // Try to extract the title from the HTML
    const titleMatch = html.match(/<title>(.*?)<\/title>/);

    if (titleMatch) {
      return {
        statusCode: 200,
        body: { title: titleMatch[1].replace(' - YouTube', '') }, // Return a valid body with status code 200
      };
    } else {
      return { statusCode: 404, body: { error: 'Could not extract title' } }; // Return 404 if title not found
    }
  } catch (error) {
    console.log('Error fetching URL:', error);
    return { statusCode: 500, body: { error: 'Failed to fetch page' } }; // Return 500 for server errors
  }
});
