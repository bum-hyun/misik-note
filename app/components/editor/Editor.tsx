import EditorJS from '@editorjs/editorjs';
import Undo from 'editorjs-undo';
import { useEffect, useRef } from 'react';

import { useEditorStore } from '~/stores/editorStore';
import EditorTools from '~/utils/editor/EditorTools';

const Editor = () => {
  const { setEditor } = useEditorStore();

  const editorCore = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: EditorTools,
      onReady: () => {
        const editor = editorCore.current;
        new Undo({ editor });
        setEditor(editor);
      },
    });

    editorCore.current = editor;

    return () => {
      editor.clear();
      editor.isReady.then(() => editor.destroy()).catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id={'editorjs'}></div>;
};

export default Editor;
