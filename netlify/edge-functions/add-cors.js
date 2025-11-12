export default async (request, context) => {
  const response = await context.next();
  return new Response(response.body, {
    headers: {
      ...Object.fromEntries(response.headers),
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-headers': '*'
    }
  });
};

export const config = { path: '/*' };
