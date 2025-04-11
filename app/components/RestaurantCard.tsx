import { useState } from 'react';
import { Link } from '@remix-run/react';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import Button from '~/components/Button/Button';
import RestaurantTags from '~/components/RestaurantTags';
import { useUserStore } from '~/stores/userStore';

interface IRestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard = ({ item }: IRestaurantCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const { isLoggedIn } = useUserStore();

  return (
    <article className={containerStyle}>
      <div className={imageWrapStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover && (
          <div className={imageWrapOverlayStyle}>
            <div className={buttonWrapStyle}>
              {item.reservation_url && (
                <Link to={item.reservation_url} target={'_blank'}>
                  <Button className={goToReservationButtonStyle}>예약 페이지</Button>
                </Link>
              )}
              <Link to={`/restaurant/${item.id}/review`}>
                <Button className={seeReviewButtonStyle}>후기 보기</Button>
              </Link>
              {isLoggedIn && (
                <Link to={`/restaurant/${item.id}/review/new`}>
                  <Button className={writeReviewButtonStyle}>후기 작성</Button>
                </Link>
              )}
            </div>
          </div>
        )}
        {item.thumbnail && <img className={imageStyle} src={item.thumbnail} alt="image" width={300} height={315} loading="eager" />}
      </div>
      <div className={infoWrapStyle}>
        <RestaurantTags tags={item.tags} />
        <h4 className={nameStyle}>{item.name}</h4>
        <p className={descriptionStyle}>{item.description}</p>
      </div>
    </article>
  );
};

export default RestaurantCard;

const containerStyle = css({
  position: 'relative',
  width: '100%',
});

const imageWrapStyle = css({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '315px',
  backgroundColor: '#7c7c7c',
  borderRadius: '16px',
  overflow: 'hidden',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const infoWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  overflowX: 'hidden',
});

const nameStyle = ellipsis({
  marginTop: '4px',
  color: '#111',
  lines: 2,
});

const descriptionStyle = ellipsis({
  lines: 2,
});

const imageWrapOverlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#00000080',
  borderRadius: '16px',
  zIndex: 1,
});

const buttonWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const goToReservationButtonStyle = css({
  width: '110px',
  backgroundColor: 'green.400  !important',

  _hover: {
    backgroundColor: 'green.500  !important',
  },
});

const seeReviewButtonStyle = css({
  width: '110px',
  backgroundColor: 'blue.400 !important',

  _hover: {
    backgroundColor: 'blue.500  !important',
  },
});

const writeReviewButtonStyle = css({
  width: '110px',
});
