import EditorJSHTML from 'editorjs-html';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from '@remix-run/react';
import { css } from 'styled-system/css';

import Button from '~/components/Button/Button';
import AddRestaurantModal from '~/components/restaurant_review/AddRestaurantModal';
import Select from '~/components/Select';
import { useGetRestaurantNames } from '~/services/restaurant/restaurant_queries';
import { usePostRestaurantReview, usePutRestaurantReview } from '~/services/restaurant_review/restaurant_review_queries';
import { useEditorStore } from '~/stores/editorStore';
import { useUserStore } from '~/stores/userStore';

interface IEditReviewProps {
  reviewId?: string | number;
}

const Editor = lazy(() => import('~/components/editor/Editor'));

const EditReview = ({ reviewId }: IEditReviewProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [restaurantId, setRestaurantId] = useState<string | number>(params.restaurantId as string);
  const [visible, setVisible] = useState(false);

  const { user } = useUserStore();
  const { reviewTitle, setReviewTitle, editor } = useEditorStore();

  const { data: restaurantNames, refetch } = useGetRestaurantNames();
  const { mutateAsync: postRestaurantReview } = usePostRestaurantReview();
  const { mutateAsync: putRestaurantReview } = usePutRestaurantReview();

  const options = useMemo(() => {
    if (!restaurantNames) return [];
    return restaurantNames.map((item) => ({ label: item.name, value: item.id }));
  }, [restaurantNames]);

  const handleClickEdit = async () => {
    const data = await editor!.save();
    const filteredBlocks = data.blocks.filter((block) => {
      const { type, data } = block;
      if (type === 'image' || type === 'video') {
        return typeof data.url === 'string' && data.url.trim() !== '';
      }
      return true;
    });
    const newData = { ...data, blocks: filteredBlocks };

    const edjsParser = EditorJSHTML();
    const htmlBlocks = edjsParser.parse(newData);

    const textTypes = ['paragraph', 'header', 'quote', 'list'];
    const text = data.blocks
      .filter((block) => textTypes.includes(block.type) && block.data?.text)
      .map((block) => {
        const text = block.data.text;
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
      })
      .join('\n');
    const files = filteredBlocks.filter((block) => ['image', 'video'].includes(block.type)).map((block) => block.data.url);

    const payload: IPostRestaurantReview = {
      editor_object: newData,
      editor_html: htmlBlocks,
      restaurant_id: Number(restaurantId),
      title: reviewTitle,
      user_id: user!.id,
      files,
      text,
    };

    if (reviewId) {
      await putRestaurantReview({ id: Number(reviewId), ...payload });
    } else {
      await postRestaurantReview(payload);
    }

    navigate(`/restaurant/${restaurantId}/review`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    setReviewTitle(el.value);
  };

  const handleAddRestaurantClick = () => {
    setVisible(true);
  };

  const handleCompleteAddRestaurant = async (id: number) => {
    await refetch();
    setRestaurantId(id);
    setVisible(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [reviewTitle]);

  return (
    <>
      <div className={editorContainerStyle}>
        <div className={topButtonContainerStyle}>
          <Button onClick={handleClickEdit}>등록</Button>
        </div>
        <div className={titleContainerStyle}>
          <textarea ref={textareaRef} className={titleInputStyle} rows={1} value={reviewTitle} onChange={handleChange} placeholder={'제목을 입력해주세요.'} />
        </div>
        <div className={selectContainerStyle}>
          {restaurantNames && <Select value={Number(restaurantId)} options={options} onChange={(value) => setRestaurantId(value)} />}
          <div className={noRestaurantTextWrapStyle}>
            찾는 식당이 없나요?
            <button className={noRestaurantTextStyle} onClick={handleAddRestaurantClick}>
              식당을 추가해주세요.
            </button>
          </div>
        </div>
        <Suspense fallback={null}>
          <Editor />
        </Suspense>
      </div>
      <AddRestaurantModal visible={visible} handleCloseModal={() => setVisible(false)} handleCompleteAddRestaurant={handleCompleteAddRestaurant} />
    </>
  );
};

export default EditReview;

const editorContainerStyle = css({
  position: 'relative',
  maxWidth: '960px',
  width: '100%',
  margin: '60px auto',
  padding: '0 64px',
});

const topButtonContainerStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const titleContainerStyle = css({
  marginBottom: '16px',
  borderBottom: '1px solid #ddd',
});

const titleInputStyle = css({
  width: '100%',
  fontSize: '45px',
  fontWeight: '600',
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
  lineHeight: '1.4',
  padding: '8px 0',
  outline: 'none',
});

const selectContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #ddd',
});

const noRestaurantTextWrapStyle = css({
  display: 'flex',
  gap: '8px',
  fontSize: 14,
  color: '#666',
});

const noRestaurantTextStyle = css({
  color: '#0070f3',
  textDecoration: 'underline',
});
