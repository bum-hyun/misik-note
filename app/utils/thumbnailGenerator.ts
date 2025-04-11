export const generateThumbnail = (videoFile: File, time = 0): Promise<File> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    video.crossOrigin = 'anonymous';

    video.addEventListener('loadeddata', () => {
      video.currentTime = time;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight / 2;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const thumbnail = canvas.toDataURL('image/png');
      const arr = thumbnail.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const fileName = videoFile.name.split('.')[0] + '.png';
      const newFile = new File([u8arr], fileName, { type: mime });
      resolve(newFile);
    });

    video.onerror = () => {
      reject('비디오를 로드하는 데 문제가 발생했습니다.');
    };
  });
};
