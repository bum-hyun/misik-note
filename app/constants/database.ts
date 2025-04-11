export const DATABASE_NAMES = {
  RESTAURANTS: 'restaurants',
  RESTAURANT_REVIEWS: 'restaurant_reviews',
  REPORT: 'bug_reports',
};

export const RESTAURANT_REVIEW_WITH_WRITER_SELECT = `
  *,
  writer:users!restaurant_reviews_user_id_fkey (
    id,
    nickname,
    email
  ),
  restaurant:restaurants!restaurant_reviews_restaurant_id_fkey (
    id,
    name,
    tags
  )
`;

export const RESTAURANT_NAMES = 'id, name, status';
