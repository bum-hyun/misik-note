import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';

import ArrowIcon from '~/assets/ArrowIcon';
import { isEmpty } from '~/utils/common';

interface IRestaurantTagsProps {
  tags: string[];
}

const RestaurantTags = ({ tags }: IRestaurantTagsProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  }, []);

  const handleClickArrow = useCallback(
    (direction: 'left' | 'right') => {
      if (!scrollRef.current) return;
      const scrollByAmount = 500;

      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollByAmount : -scrollByAmount,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    },
    [checkScroll]
  );

  useEffect(() => {
    checkScroll();

    const handleResize = () => {
      checkScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScroll]);

  if (isEmpty(tags)) return <></>;

  return (
    <>
      {!isEmpty(tags) && (
        <div className={tagContainer}>
          {showLeftArrow && (
            <div className={`${arrowArea} left`}>
              <button className={`${arrowWrap} left`} onClick={() => handleClickArrow('left')}>
                <ArrowIcon direction={'left'} />
              </button>
            </div>
          )}
          <div ref={scrollRef} className={tagList}>
            {tags.map((tag) => (
              <span key={tag} className={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
          {showRightArrow && (
            <div className={`${arrowArea} right`}>
              <button className={`${arrowWrap} right`} onClick={() => handleClickArrow('right')}>
                <ArrowIcon direction={'right'} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantTags;

const tagContainer = css({
  position: 'relative',
});

const tagList = css({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '4px',
  overflowX: 'auto',
  scrollbar: 'hidden',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': { display: 'none' },
});

const tagStyle = css({
  flex: 'none',
  padding: '4px 6px',
  fontSize: '12px',
  color: '#111',
  backgroundColor: '#e9e9e9',
  borderRadius: '16px',
  userSelect: 'text',
});

const arrowArea = css({
  position: 'absolute',
  top: '0',
  right: '0',
  display: 'flex',
  alignItems: 'center',
  width: '45px',
  height: '26px',
  background: 'linear-gradient(to left, #fff 25%, #ffffff00 100%)',

  '&.left': {
    left: '0',
    background: 'linear-gradient(to right, #fff 20%, transparent)',
  },

  '&.right': {
    right: '0',
  },
});

const arrowWrap = css({
  position: 'absolute',
  cursor: 'pointer',

  '&.left': {
    left: '0',
  },

  '&.right': {
    right: '0',
  },
});
