import { useEffect, useState } from 'react';
import Button from 'src/components/Button/Button';
import { css } from 'styled-system/css';

import Modal from '~/components/Overlay/Modal';
import { usePostRestaurant } from '~/services/restaurant/restaurant_queries';

interface IAddRestaurantModalProps {
  visible: boolean;
  handleCloseModal: () => void;
  handleCompleteAddRestaurant: (id: number) => void;
}

const AddRestaurantModal = ({ visible, handleCloseModal, handleCompleteAddRestaurant }: IAddRestaurantModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState('');

  const { mutateAsync: addRestaurant } = usePostRestaurant();

  const handleAddRestaurant = async () => {
    const data = await addRestaurant({ name, status: 'pending' });
    handleCompleteAddRestaurant(data.id);
    setName('');
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
            <div className={addRestaurantTextStyle}>식당을 추가해주세요.</div>
            <div className={inputWrapStyle}>
              <input className={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
              <Button className={buttonStyle} onClick={handleAddRestaurant}>
                추가
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddRestaurantModal;

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
  padding: '7px 8px',
  border: '1px solid #eee',
  borderRadius: '8px',
});

const buttonStyle = css({
  flex: 'none',
});
