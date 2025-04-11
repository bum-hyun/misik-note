import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SERVICE_KEY } from '~/constants/service';
import { deleteRestaurant, getRestaurant, getRestaurantName, getRestaurantNames, getRestaurants, postRestaurant, putRestaurant } from '~/services/restaurant/restaurant_api';

export const useGetRestaurants = (params: IGetRestaurantsParams) =>
  useInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, params],
    queryFn: ({ pageParam = 0 }) => getRestaurants({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === (params.limit || 10) ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

export const useGetRestaurant = (id: number) =>
  useQuery<IRestaurant>({
    queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANT, id],
    queryFn: () => getRestaurant(id),
  });

export const usePostRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT.POST_RESTAURANT],
    mutationFn: (payload: IPostRestaurant) => postRestaurant(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, SERVICE_KEY.RESTAURANT.RESTAURANT_NAMES] });
    },
  });
};

export const usePutRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT.PUT_RESTAURANT],
    mutationFn: (payload: IPutRestaurant) => putRestaurant(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, SERVICE_KEY.RESTAURANT.RESTAURANT_NAMES] });
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT.DELETE_RESTAURANT],
    mutationFn: (id: number) => deleteRestaurant(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, SERVICE_KEY.RESTAURANT.RESTAURANT_NAMES] });
    },
  });
};

export const useGetRestaurantNames = () =>
  useQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.RESTAURANT_NAMES],
    queryFn: getRestaurantNames,
  });

export const useGetRestaurantName = (restaurantId: number) =>
  useQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.RESTAURANT_NAME],
    queryFn: () => getRestaurantName(restaurantId),
  });
