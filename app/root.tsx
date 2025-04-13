import './globals.css';

import { json, LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import { css } from 'styled-system/css';

import Header from '~/header';
import { ReactQueryProvider } from '~/provider';
import { getSupabaseFromServer } from '~/utils/supabase/server';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: '미식노트' },
    { name: 'description', content: '전 세계 레스토랑 후기 플랫폼' },
    { name: 'keywords', content: '레스토랑, 후기, 미식, 다이닝, 세계음식, 음식기록, 월드베스트레스토랑, 미슐랭' },
    { property: 'og:title', content: '미식노트' },
    { property: 'og:description', content: '전 세계 레스토랑 후기 플랫폼' },
    { property: 'og:url', content: 'https://misiknote.com' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://misiknote.com/background.webp' },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: '/' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = getSupabaseFromServer(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return json({ user, isLoggedIn: !!user }, { headers: response.headers });
}

export function Layout() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <ReactQueryProvider>
        <body className={css({ display: 'flex', flexDirection: 'column', height: '100vh' })}>
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <Analytics />
          <SpeedInsights />
        </body>
      </ReactQueryProvider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
