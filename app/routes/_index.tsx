import { json, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantList from '~/components/RestaurantList';
import { SERVICE_KEY } from '~/constants/service';
import { getRestaurants } from '~/services/restaurant/restaurant_api';

export const meta: MetaFunction = () => [
  { title: '미식노트' },
  { name: 'description', content: '전 세계에 있는 레스토랑에 다녀온 후기를 남겨주세요!' },
  { name: 'keywords', content: '레스토랑, 후기, 다이닝, 세계음식, 맛집' },
];

export async function loader() {
  const queryClient = new QueryClient();
  const params: IGetRestaurantsParams = { page: 0, limit: 10, status: 'active' };

  await queryClient.prefetchInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, params],
    queryFn: () => getRestaurants(params),
    initialPageParam: 0,
  });

  return json({ dehydratedState: dehydrate(queryClient) });
}

export default function Index() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <div className={containerStyle}>
      <div className={contentsWrapStyle}>
        <div className={flex({ flexDirection: 'column' })}>
          <h1 className={titleStyle}>전체</h1>
          <div className={descriptionStyle}>전 세계에 있는 레스토랑에 다녀온 후기를 남겨주세요!</div>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <RestaurantList />
        </HydrationBoundary>
      </div>
    </div>
  );
}

const containerStyle = css({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});

const contentsWrapStyle = css({
  maxWidth: '1288px',
  margin: 'auto',
  padding: '16px 20px 60px',
});

const titleStyle = css({
  maxWidth: '750px',
  marginBottom: '8px',
  fontSize: '36px',
  fontWeight: '600',
  color: '#111',
  wordWrap: 'break-word',
});

const descriptionStyle = css({
  maxWidth: '750px',
  marginBottom: '16px',
  fontSize: '16px',
  color: '#111',
  wordWrap: 'break-word',
});
