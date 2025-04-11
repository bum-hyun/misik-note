import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { SERVICE_KEY } from '~/constants/service';
import RestaurantReviewList from '~/routes/restaurant/$restaurantId/review/RestaurantReviewList';
import { getRestaurantName } from '~/services/restaurant/restaurant_api';
import { getRestaurantReviews } from '~/services/restaurant_review/restaurant_review_api';

export async function loader({ params }: LoaderFunctionArgs) {
  const restaurantId = Number(params.restaurantId);
  const queryClient = new QueryClient();

  const reviewParams = { restaurantId, page: 0, limit: 10 };

  await queryClient.prefetchQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.RESTAURANT_NAME],
    queryFn: () => getRestaurantName(restaurantId),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEWS, reviewParams],
    queryFn: () => getRestaurantReviews(reviewParams),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return json({ dehydratedState, restaurantId });
}

export default function RestaurantReviewPage() {
  const { dehydratedState, restaurantId } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <RestaurantReviewList key={restaurantId} />
    </HydrationBoundary>
  );
}
