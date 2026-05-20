const AIHOT_ORIGIN = 'https://aihot.virxact.com'
const AIHOT_PUBLIC_PREFIX = '/api/public'
const AIHOT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const createUpstreamUrl = (requestUrl, pathParam) => {
  const incomingUrl = new URL(requestUrl)
  const path = Array.isArray(pathParam)
    ? pathParam.join('/')
    : typeof pathParam === 'string'
      ? pathParam
      : ''
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : ''

  return new URL(`${AIHOT_PUBLIC_PREFIX}${normalizedPath}${incomingUrl.search}`, AIHOT_ORIGIN)
}

const createProxyHeaders = (request) => {
  const headers = new Headers()
  const accept = request.headers.get('accept')
  const ifNoneMatch = request.headers.get('if-none-match')

  if (accept) headers.set('Accept', accept)
  if (ifNoneMatch) headers.set('If-None-Match', ifNoneMatch)

  headers.set('User-Agent', AIHOT_USER_AGENT)
  return headers
}

export async function onRequest(context) {
  const { request, params } = context

  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: {
        Allow: 'GET, HEAD',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }

  try {
    return await fetch(createUpstreamUrl(request.url, params?.path), {
      method: request.method,
      headers: createProxyHeaders(request),
      redirect: 'follow'
    })
  } catch {
    return new Response(JSON.stringify({ error: 'aihot_upstream_failed' }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
}
