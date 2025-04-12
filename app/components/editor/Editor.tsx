import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';

import { useEditorStore } from '~/stores/editorStore';
import EditorTools from '~/utils/editor/EditorTools';

const Editor = () => {
  const { setEditor } = useEditorStore();

  const editorCore = useRef<EditorJS | null>(null);

  useEffect(() => {
    const load = async () => {
      const { default: EditorJS } = await import('@editorjs/editorjs');
      editorCore.current = new EditorJS({
        holder: 'editorjs',
        tools: EditorTools,
        onReady: () => {
          const editor = editorCore.current;
          setEditor(editor);
        },
      });
    };

    load();

    return () => {
      editorCore.current?.isReady.then(() => editorCore.current?.destroy()).catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id={'editorjs'}></div>;
};

export default Editor;
