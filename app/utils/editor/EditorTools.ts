import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';

import SupabaseImageTool from '~/utils/editor/SupabaseImageTool';
import TextBackgroundColor from '~/utils/editor/TextBackgroundColor';
import TextColor from '~/utils/editor/TextColor';

const EditorTools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      preserveBlank: true,
    },
    validate() {
      return true;
    },
  },
  heading: {
    class: Header,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: SupabaseImageTool,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: '인용구 입력',
      captionPlaceholder: '출처',
    },
  },
  embed: Embed,
  marker: Marker,
  delimiter: Delimiter,
  color: {
    class: TextColor,
    config: {
      colorCollections: ['#ffffff', '#000000', '#16b06d', '#00c6be', '#2e84b6', '#959595', '#f4c016', '#f6655b', '#ec4c69', '#5c5cb2'],
    },
  },
  backgroundColor: {
    class: TextBackgroundColor,
    config: {
      colorCollections: ['#ffffff', '#000000', '#16b06d', '#00c6be', '#2e84b6', '#959595', '#f4c016', '#f6655b', '#ec4c69', '#5c5cb2'],
    },
  },
};

export default EditorTools;
