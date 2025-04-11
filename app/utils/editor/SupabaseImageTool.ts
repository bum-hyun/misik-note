import { API, BlockAPI } from '@editorjs/editorjs';

import browserClient from '~/utils/supabase/client';

export default class SupabaseImageTool {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '🖼️',
    };
  }

  private readonly data: { url?: string };
  private readonly api: API;
  private readonly wrapper: HTMLElement;
  private readonly block: BlockAPI;
  private isInitialRender = true;

  constructor({ data, api, block }: any) {
    this.data = data || {};
    this.api = api;
    this.block = block;
    this.wrapper = document.createElement('div');
  }

  render() {
    this.wrapper.innerHTML = '';
    this.wrapper.tabIndex = 0;
    this.wrapper.style.margin = '8px 0';

    // 이미지가 있으면 바로 렌더
    if (this.data.url) {
      const img = document.createElement('img');
      img.src = this.data.url;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      this.wrapper.appendChild(img);
    } else {
      // 이미지 없으면 자동 업로드 트리거
      if (this.isInitialRender) {
        this.isInitialRender = false;
        setTimeout(() => this.triggerFileSelect(), 50);
      }

      // 업로드 중 메시지는 없이 빈 상태 유지
    }

    // 포커스 / 키보드 / 클릭 이벤트
    this.wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        const index = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.delete(index);
      }
    });

    this.wrapper.addEventListener('click', () => {
      this.wrapper.focus();
    });

    this.wrapper.addEventListener('focus', () => {
      this.wrapper.style.opacity = '0.8';
    });

    this.wrapper.addEventListener('blur', () => {
      this.wrapper.style.opacity = '1';
    });

    return this.wrapper;
  }

  handleKeydown = (e: KeyboardEvent) => {
    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    const isFocused = this.api.blocks.getBlockByIndex(currentIndex)?.id === this.block.id;

    if (isFocused && e.key === 'Backspace') {
      if (this.data.url) {
        this.api.blocks.delete(currentIndex);
      }
    }
  };

  async triggerFileSelect() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', async () => {
      const files = Array.from(input.files ?? []).reverse();

      console.log(files);
      const currentIndex = this.api.blocks.getCurrentBlockIndex();
      this.api.blocks.delete(currentIndex);

      // ✅ 순서 보장: 앞에서부터 차례대로 업로드 및 삽입
      for (const file of files) {
        const filePath = `files/${Date.now()}_${file.name}`;
        const { error } = await browserClient.storage.from('files').upload(filePath, file);

        if (error) {
          console.error('Upload error:', error);
          continue;
        }

        const { publicUrl } = browserClient.storage.from('files').getPublicUrl(filePath).data;

        // ✅ 모든 이미지를 blocks.insert 로 삽입 (첫 번째 포함)
        await new Promise((resolve) => {
          setTimeout(() => {
            this.api.blocks.insert('image', { url: publicUrl }, undefined, undefined, false);
            resolve(true);
          }, 0);
        });
      }
    });

    input.click();
  }

  save() {
    return this.data;
  }
}
