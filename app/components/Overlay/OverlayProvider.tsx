import { createContext, Fragment, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';

export const OverlayContext = createContext<{
  openOverlay(id: string, element: ReactNode): void;
  closeOverlay(id: string): void;
} | null>(null);
if (process.env.NODE_ENV !== 'production') {
  OverlayContext.displayName = 'OverlayContext';
}

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayIds, setOverlayIds] = useState<Map<string, ReactNode>>(new Map());

  const openOverlay = useCallback((id: string, element: ReactNode) => {
    setOverlayIds((ids) => {
      const cloned = new Map(ids);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const closeOverlay = useCallback((id: string) => {
    setOverlayIds((ids) => {
      const cloned = new Map(ids);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ openOverlay, closeOverlay }), [openOverlay, closeOverlay]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayIds.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
