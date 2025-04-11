import { css } from 'styled-system/css';

import { Button } from '~/components/Button';
import { useUserStore } from '~/stores/userStore';
import { Link } from '@remix-run/react';

interface IEditReviewButtonProps {
  post?: IRestaurantReview | null;
}

const EditReviewButton = ({ post }: IEditReviewButtonProps) => {
  const { user } = useUserStore();

  return (
    <>
      {user && post?.writer.id === user.id && (
        <Button className={buttonStyle}>
          <Link to={`/restaurant/${post.restaurant_id}/review/${post.id}/edit`}>수정</Link>
        </Button>
      )}
    </>
  );
};

export default EditReviewButton;

const buttonStyle = css({
  marginLeft: 'auto',
});
