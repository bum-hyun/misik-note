import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SERVICE_KEY } from '~/constants/service';
import { getRestaurantReview, getRestaurantReviews, postRestaurantReview, putRestaurantReview } from '~/services/restaurant_review/restaurant_review_api';

export const useGetRestaurantReviews = (params: IGetRestaurantReviewsParams) =>
  useInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEWS, params],
    queryFn: ({ pageParam = 0 }) => getRestaurantReviews({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === (params.limit || 10) ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

export const useGetRestaurantReview = (reviewId: number) =>
  useQuery<IRestaurantReview>({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW, reviewId],
    queryFn: () => getRestaurantReview(reviewId),
  });

export const usePostRestaurantReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT_REVIEW.POST_RESTAURANT_REVIEW],
    mutationFn: (payload: IPostRestaurantReview) => postRestaurantReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW] });
    },
  });
};

export const usePutRestaurantReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT_REVIEW.PUT_RESTAURANT_REVIEW],
    mutationFn: (payload: IPutRestaurantReview) => putRestaurantReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW] });
    },
  });
};
