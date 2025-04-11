import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import { css } from 'styled-system/css';

import EditReviewButton from '~/components/restaurant_review/EditReviewButton';
import { getRestaurantReview } from '~/services/restaurant_review/restaurant_review_api';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const reviewId = Number(params.reviewId);
  const post = await getRestaurantReview(reviewId);

  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: '리뷰를 찾을 수 없습니다' }, { name: 'description', content: '해당 리뷰가 존재하지 않거나 삭제되었습니다.' }];
  }

  const { post } = data;
  const description = `${post.text.substring(0, 100)}..`;
  const keywords = ['미식노트', '레스토랑 후기', '맛집 리뷰', '다이닝', '다이닝 후기', ...(post.restaurant?.tags ?? []), post.restaurant.name];

  return [
    { title: `${post.title} - 미식노트` },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
    { property: 'og:title', content: `${post.title} - 미식노트` },
    { property: 'og:description', content: description },
    ...(post.files?.[0] ? [{ property: 'og:image', content: post.files[0] }] : []),
  ];
};

export default function ReviewDetailPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className={containerStyle}>
      <h1 className={titleStyle}>{post.title}</h1>
      <div className={writerAndDateContainerStyle}>
        <div className={writerStyle}>{post.writer.nickname}</div>
        <div className={dateStyle}>{dayjs(post.created_at).format('YYYY. MM. DD. HH:mm')}</div>
        <EditReviewButton post={post} />
      </div>
      <hr className={dividerStyle} />
      <article
        className={articleStyle}
        dangerouslySetInnerHTML={{
          __html: post.editor_html?.replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>') ?? '',
        }}
      />
    </main>
  );
}

const containerStyle = css({
  maxWidth: '786px',
  margin: '0 auto',
  padding: '32px 16px',
});

const titleStyle = css({
  width: '100%',
  fontWeight: '500',
  marginBottom: '16px',
});

const writerAndDateContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const dividerStyle = css({
  margin: '16px 0',
  height: '1px',
  borderColor: '#eee',
});

const writerStyle = css({
  color: '#666',
});

const dateStyle = css({
  color: '#666',
});

const articleStyle = css({
  '& img': {
    marginTop: '6px',
  },
});
