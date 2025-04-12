import { useNavigate } from '@remix-run/react';
import { lazy, useState } from 'react';
import { css } from 'styled-system/css';

import Logo from '~/assets/logo.png';
import Button from '~/components/Button/Button';
import { ROUTE_PATHS } from '~/constants/pathname';
import { useIsMobile } from '~/hooks/useIsMobile';
import { useUserStore } from '~/stores/userStore';
import { getSupabaseBrowserClient } from '~/utils/supabase/client';

const LoginModal = lazy(() => import('~/components/home/LoginModal'));
const ReportModal = lazy(() => import('~/components/home/ReportModal'));

const Header = () => {
  const navigate = useNavigate();
  const { setUser, isLoggedIn } = useUserStore();
  const isMobile = useIsMobile();

  const [visible, setVisible] = useState(false);
  const [visibleReportModal, setVisibleReportModal] = useState(false);
  //
  // const getUser = async () => {
  //   setUser({
  //     name: user.user_metadata.name,
  //     email: user.user_metadata.email,
  //     nickname: user.user_metadata.nickname,
  //     avatar_url: user.user_metadata.avatar_url,
  //     role: user.role,
  //     id: user.id,
  //     provider: user.app_metadata.provider,
  //   });
  // };

  const handleClickLogin = () => setVisible(true);

  const handleClickLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
  };

  const handleReport = () => setVisibleReportModal(true);

  return (
    <>
      <nav className={containerStyle}>
        <div className={lefSideContainerStyle}>
          <button className={logoStyle} onClick={() => navigate(ROUTE_PATHS.HOME)}>
            <img src={Logo} alt="logo" width={40} height={40} />
            {!isMobile && <span>미식노트</span>}
          </button>
        </div>
        <div className={rightSideContainerStyle}>
          <Button onClick={handleReport}>버그제보 및 개선점 제안</Button>
          {!isLoggedIn && <Button onClick={handleClickLogin}>로그인</Button>}
          {isLoggedIn && <Button onClick={handleClickLogout}>로그아웃</Button>}
        </div>
      </nav>
      <div className={emptyHeightStyle} />
      <LoginModal visible={visible} handleCloseModal={() => setVisible(false)} />
      <ReportModal visible={visibleReportModal} handleCloseModal={() => setVisibleReportModal(false)} />
    </>
  );
};

export default Header;

const containerStyle = css({
  position: 'fixed',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '72px',
  backgroundColor: '#000',
  userSelect: 'none',
  zIndex: 100,
});

const lefSideContainerStyle = css({
  flex: 1,
  padding: '0 8px 0 16px',
});

const logoStyle = css({
  display: 'flex',
  alignItems: 'center',
  minWidth: '60px',
  minHeight: '60px',
  fontSize: '24px',
  fontWeight: 700,
  color: '#fff',
  cursor: 'pointer',
});

const emptyHeightStyle = css({
  flex: 'none',
  height: '72px',
  backgroundColor: '#000',
});

const rightSideContainerStyle = css({
  flex: 'none',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '16px',
  gap: '16px',
});
