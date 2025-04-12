import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { getSupabaseBrowserClient } from '~/utils/supabase/client';

interface IEditRestaurantFormProps {
  payload: IPostRestaurant | IPutRestaurant;
  setPayload: Dispatch<SetStateAction<IPostRestaurant | IPutRestaurant>>;
  editRestaurant: () => void;
}

const EditRestaurantForm = ({ payload, setPayload, editRestaurant }: IEditRestaurantFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const INPUT_CONTENTS: { label: string; name: keyof IPostRestaurant; type?: string }[] = [
    { label: '이름', name: 'name' },
    { label: '주소', name: 'address' },
    { label: '전화번호', name: 'tel' },
    { label: '이메일', name: 'email' },
    { label: '예약 페이지', name: 'reservation_url' },
    { label: '런치 가격', name: 'launch_price', type: 'number' },
    { label: '디너 가격', name: 'dinner_price', type: 'number' },
    { label: '통화', name: 'currency' },
    { label: '태그', name: 'tags' },
  ];

  const [isHover, setIsHover] = useState(false);

  const handleChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'tags') {
      setPayload((prev) => ({ ...prev, tags: value.split(',') }));
      return;
    }

    if (name === 'launch_price' || name === 'dinner_price') {
      setPayload((prev) => ({ ...prev, [name]: Number(value) || 0 }));
      return;
    }

    setPayload((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleUploadThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = getSupabaseBrowserClient();
    const file = event.target.files?.[0];
    if (!file) return;

    const filePath = `files/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('files').upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return;
    }

    const { publicUrl } = supabase.storage.from('files').getPublicUrl(filePath).data;

    inputRef.current!.value = '';
    setPayload((prev) => ({ ...prev, thumbnail: publicUrl }));
  };

  return (
    <div className={css({ flex: 1, overflowX: 'hidden', overflowY: 'auto' })}>
      <div className={css({ margin: 'auto' })}>
        <div className={flex({ flexDirection: 'column', gap: '24px' })}>
          <div className={imageWrapStyle} onClick={() => inputRef.current?.click()} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover && (
              <div className={imageWrapOverlayStyle}>
                <div className={buttonWrapStyle}>
                  <button className={buttonStyle}>업로드</button>
                </div>
              </div>
            )}
            {payload.thumbnail && <img className={imageStyle} src={payload.thumbnail} width={236} height={315} alt={''} />}
            <input className={invisibleInputStyle} ref={inputRef} name={'thumbnail'} type={'file'} accept={'image/*'} onChange={handleUploadThumbnail} tabIndex={-1} />
          </div>

          {INPUT_CONTENTS.map(({ label, name, type }) => (
            <div key={name} className={wrapStyle}>
              <div className={labelStyle}>{label}</div>
              <div className={valueStyle}>
                <input className={inputStyle} name={name} type={type || 'text'} value={Array.isArray(payload[name]) ? payload[name].join(',') : String(payload[name] ?? '')} onChange={handleChange} />
              </div>
            </div>
          ))}

          <div className={submitButtonWrapStyle}>
            <button className={submitButtonStyle} onClick={editRestaurant}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurantForm;

const wrapStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const imageWrapStyle = css({
  position: 'relative',
  width: '236px',
  height: '315px',
  marginBottom: '24px',
  backgroundColor: '#969696',
  borderRadius: '16px',
  overflow: 'hidden',
  cursor: 'pointer',
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
});

const labelStyle = css({
  flex: 'none',
  width: '120px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#111',
});

const valueStyle = css({
  flex: 1,
  width: '100%',
});

const inputStyle = css({
  width: '100%',
  borderBottom: '1px solid #ddd',
  outline: 'none',
});

const submitButtonWrapStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

const submitButtonStyle = css({
  padding: '8px 16px',
  color: '#fff',
  backgroundColor: '#32bc69',
  borderRadius: '8px',
  cursor: 'pointer',
});

const invisibleInputStyle = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const buttonWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const buttonStyle = css({
  padding: '8px 16px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#ffffff',
  backgroundColor: '#737373',
  borderRadius: '4px',
});
