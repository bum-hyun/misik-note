import { css } from 'styled-system/css';

import { useGetReports } from '~/services/reposrt/report_queries';

const Page = () => {
  const { data } = useGetReports();

  return (
    <div className={containerStyle}>
      <div className={titleStyle}>버그 제보 및 개선점 제안</div>
      <div className={listContainerStyle}>{data?.map((item) => <div key={item.id}>{item.content}</div>)}</div>
    </div>
  );
};

export default Page;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const titleStyle = css({
  maxWidth: '750px',
  marginBottom: '8px',
  fontSize: '36px',
  fontWeight: '600',
  color: '#111',
  wordWrap: 'break-word',
});

const listContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
