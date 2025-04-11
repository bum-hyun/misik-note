import { ReactNode, useCallback, useContext, useState } from 'react';

import { OverlayContext } from '~/components/Overlay/OverlayProvider';

let startNumber = 0;

export const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (!context) throw new Error('useOverlay 는 OverlayProvider 내부에서 사용해야 합니다.');

  const { openOverlay, closeOverlay } = context;
  const [id] = useState(() => String(startNumber++));

  const open = useCallback(
    (element: ReactNode) => {
      openOverlay(id, element);
    },
    [id]
  );

  const close = useCallback(() => {
    closeOverlay(id);
  }, [id]);

  return { open, close };
};
