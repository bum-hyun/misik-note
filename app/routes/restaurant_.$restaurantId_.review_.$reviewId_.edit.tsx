import { useLoaderData, useParams } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useEffect } from 'react';

import EditReview from '~/components/restaurant/review/EditReview';
import { getRestaurantReview } from '~/services/restaurant_review/restaurant_review_api';
import { useEditorStore } from '~/stores/editorStore';

export async function loader({ params }: LoaderFunctionArgs) {
  const reviewId = Number(params.reviewId);
  const restaurantReview = await getRestaurantReview(reviewId);
  return json({ restaurantReview });
}

export default function EditRestaurantReviewPage() {
  const { reviewId } = useParams();
  const { restaurantReview } = useLoaderData<typeof loader>();
  const { editor, setReviewTitle } = useEditorStore();

  useEffect(() => {
    if (editor && restaurantReview) {
      editor.render(restaurantReview.editor_object);
      setReviewTitle(restaurantReview.title);
    }
  }, [editor, restaurantReview]);

  return <EditReview reviewId={Number(reviewId)} />;
}
