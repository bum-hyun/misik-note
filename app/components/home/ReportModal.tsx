import { useEffect, useState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '~/components/Button';
import Modal from '~/components/Overlay/Modal';
import { usePostReport } from '~/services/reposrt/report_queries';
import { useUserStore } from '~/stores/userStore';

interface IAddRestaurantModalProps {
  visible: boolean;
  handleCloseModal: () => void;
}

const ReportModal = ({ visible, handleCloseModal }: IAddRestaurantModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState('');

  const { user } = useUserStore();

  const { mutateAsync: postReport } = usePostReport();

  const handleReport = async () => {
    await postReport({
      user_id: user?.id,
      content,
    });
    setContent('');
    handleCloseModal();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <Modal visible={visible} onClose={handleCloseModal}>
          <div className={modalStyle}>
            <div className={addRestaurantTextStyle}>버그 또는 개선 방향에 대해 알려주세요.</div>
            <div className={inputWrapStyle}>
              <textarea className={inputStyle} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <Button className={buttonStyle} onClick={handleReport}>
              제보
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReportModal;

const modalStyle = css({
  padding: '1.25rem 2rem',
  backgroundColor: '#fff',
  borderRadius: '1rem',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1)',
});

const inputWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const addRestaurantTextStyle = css({
  marginBottom: '16px',
  fontSize: '18px',
  fontWeight: '600',
});

const inputStyle = css({
  flex: '1',
  width: '100%',
  minHeight: '100px',
  padding: '7px 8px',
  border: '1px solid #eee',
  borderRadius: '8px',
  resize: 'none',
  overflow: 'hidden',
  lineHeight: '1.4',
  outline: 'none',
});

const buttonStyle = css({
  width: '100%',
  marginTop: '16px',
});
