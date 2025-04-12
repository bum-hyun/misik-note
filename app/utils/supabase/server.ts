import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export function getSupabaseFromServer(request: Request, response: Response) {
  return createServerClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('cookie') ?? '');
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
        }
      },
    },
  });
}
