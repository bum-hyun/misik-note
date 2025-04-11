import { useState } from 'react';
import { css } from 'styled-system/css';

import RestaurantCard from '~/components/RestaurantCard';
import { useIntersect } from '~/hooks/useIntersect';
import { useGetRestaurants } from '~/services/restaurant/restaurant_queries';

const RestaurantList = () => {
  const [params] = useState<IGetRestaurantsParams>({ page: 0, limit: 10, status: 'active' });

  const { data, fetchNextPage, hasNextPage } = useGetRestaurants(params);

  const onIntersect = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const intersectRef = useIntersect(onIntersect, hasNextPage);

  const restaurants = data?.pages.flat() ?? [];

  return (
    <div className={containerStyle}>
      {restaurants.map((item, index) => (
        <RestaurantCard key={index} item={item} />
      ))}
      <div ref={intersectRef} style={{ height: 1 }} />
    </div>
  );
};

export default RestaurantList;

const containerStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  justifyItems: 'center',
  gap: '16px',

  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },

  '@media (min-width: 481px) and (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (min-width: 769px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  '@media (min-width: 1440px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});
