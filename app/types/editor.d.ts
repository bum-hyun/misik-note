declare module '@editorjs/simple-image' {
  import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

  const SimpleImage: ToolConstructable | ToolSettings;
  export default SimpleImage;
}

declare module '@editorjs/checklist' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Checklist: ToolConstructable | undefined;
  export default Checklist;
}

declare module '@editorjs/warning' {
  import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

  const Warning: ToolConstructable | ToolSettings;
  export default Warning;
}

declare module '@editorjs/marker' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Marker: ToolConstructable | ToolSettings;
  export default Marker;
}

declare module '@editorjs/code' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Code: ToolConstructable | undefined;
  export default Code;
}

declare module '@editorjs/link' {
  import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

  const Link: ToolConstructable | ToolSettings;
  export default Link;
}

declare module '@editorjs/embed' {
  import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

  const Embed: ToolConstructable | ToolSettings;
  export default Embed;
}

declare module '@editorjs/header' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Header: ToolConstructable | undefined;
  export default Header;
}

declare module '@editorjs/list' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const List: ToolConstructable | undefined;
  export default List;
}

declare module '@editorjs/table' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Table: ToolConstructable | undefined;
  export default Table;
}

declare module '@editorjs/quote' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Quote: ToolConstructable | undefined;
  export default Quote;
}

declare module '@editorjs/paragraph' {
  import { ToolConstructable } from '@editorjs/paragraph';

  const Paragraph: ToolConstructable | undefined;
  export default Paragraph;
}

declare module 'editorjs-undo';
