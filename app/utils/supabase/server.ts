import { createServerClient } from '@supabase/ssr';
import { CookieOptions } from '@supabase/ssr/src/types';

export function serverClient(request: Request, response: Response) {
  return createServerClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get('cookie') ?? '';
        return cookieHeader.split(';').map((cookieStr) => {
          const [name, ...rest] = cookieStr.trim().split('=');
          return { name, value: rest.join('=') };
        });
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.headers.append('Set-Cookie', createSetCookieHeader(name, value, options));
        }
      },
    },
  });
}

function createSetCookieHeader(name: string, value: string, options: CookieOptions): string {
  const parts = [`${name}=${value}`];
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.secure) parts.push('Secure');
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join('; ');
}
