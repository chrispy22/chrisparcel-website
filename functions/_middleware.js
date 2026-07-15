// Password-gates the entire site with HTTP Basic Auth, via a Cloudflare
// Pages Function. Runs on every request before the static site is served.
//
// To turn the gate ON:  set an env var SITE_PASSWORD in the Cloudflare Pages
//   project (Settings → Variables and secrets), then redeploy.
// To turn the gate OFF: delete the SITE_PASSWORD variable (or delete this
//   file) and redeploy. With no SITE_PASSWORD set, the site stays public —
//   so pushing this file can never accidentally lock you out.
//
// The browser will show a username/password prompt. The username is ignored;
// only the password must match SITE_PASSWORD.
export async function onRequest(context) {
  const { request, env, next } = context;
  const expected = env.SITE_PASSWORD;

  // No password configured → don't lock anyone out.
  if (!expected) return next();

  const header = request.headers.get('Authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded); // "username:password"
    const password = decoded.slice(decoded.indexOf(':') + 1);
    if (password === expected) return next();
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="chrisparcel.com — private", charset="UTF-8"',
    },
  });
}
