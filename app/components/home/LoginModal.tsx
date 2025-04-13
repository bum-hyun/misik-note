import { useEffect, useState } from 'react';
import Button from '~/components/Button/Button';
import { css } from 'styled-system/css';

import Modal from '~/components/Overlay/Modal';
import { getSupabaseBrowserClient } from '~/utils/supabase/client';

interface ILoginModalProps {
  visible: boolean;
  handleCloseModal: () => void;
}

const LoginModal = ({ visible, handleCloseModal }: ILoginModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const signInWithKakao = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NODE_ENV !== 'production' ? `https://misiknote.com/auth/callback` : 'http://localhost:5173/auth/callback',
      },
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <Modal visible={visible} onClose={handleCloseModal}>
          <div className={loginCardStyle}>
            <div className={doLoginTextStlye}>로그인 하기</div>
            <Button className={buttonStyle} onClick={signInWithKakao}>
              <div className={kakaoLoginStyle}>
                <img src={'/small_kakao.svg'} alt={'카카오 아이콘'} width={18} height={18} />
                <span>카카오 로그인</span>
              </div>
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;

const loginCardStyle = css({
  padding: '1.25rem 2rem',
  backgroundColor: '#fff',
  borderRadius: '1rem',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1)',
});

const doLoginTextStlye = css({
  marginBottom: '16px',
  fontSize: '20px',
  fontWeight: '800',
});

const buttonStyle = css({
  width: '100%',
  backgroundColor: '#ffe500',
  color: '#191a20',
});

const kakaoLoginStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
