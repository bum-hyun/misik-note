import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '~/constants/database';
import { getSupabaseBrowserClient } from '~/utils/supabase/client';

export const getRestaurantReviews = async (params: IGetRestaurantReviewsParams): Promise<IRestaurantReview[]> => {
  const supabase = getSupabaseBrowserClient();

  const limit = params.limit || 10;
  const from = params.page * limit;
  const to = from + limit - 1;

  let query = supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select('*').eq('restaurant_id', params.restaurantId).order('created_at', { ascending: true }).range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const getRestaurantReview = async (reviewId: number): Promise<IRestaurantReview> => {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const postRestaurantReview = async (payload: IPostRestaurantReview): Promise<IRestaurant> => {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).insert(payload).select();

  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return data[0];
};

export const putRestaurantReview = async (payload: IPutRestaurantReview) => {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};
