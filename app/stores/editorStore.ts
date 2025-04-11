import EditorJS from '@editorjs/editorjs';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  editor: EditorJS | null;
  reviewTitle: string;
};

type Actions = {
  setEditor: (editor: EditorJS | null) => void;
  setReviewTitle: (reviewTitle: string) => void;
};

export const useEditorStore = create<State & Actions>()(
  immer((set) => ({
    editor: null,
    reviewTitle: '',
    setEditor: (editor: EditorJS | null) => set({ editor }),
    setReviewTitle: (reviewTitle: string) => set({ reviewTitle }),
  }))
);
