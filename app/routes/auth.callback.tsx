import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';
  const headers = new Headers();

  if (code) {
    const supabase = createServerClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => headers.append('Set-Cookie', serializeCookieHeader(name, value, options)));
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Supabase OAuth Exchange Error:', error.message);
      return redirect('/auth/auth-code-error', { headers });
    }

    return redirect(next, { headers });
  }

  return redirect('/auth/auth-code-error', { headers });
}
