const IMGBB_API_KEY = '3aa7c298084dec017af906eaed607fd0';
const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

export interface ImgBBUploadResult {
  url: string;
  displayUrl: string;
  thumbUrl?: string;
  deleteUrl?: string;
}

export async function uploadImageToImgBB(file: File): Promise<ImgBBUploadResult> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (PNG, JPG, WebP).');
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Image size must be smaller than 15 MB.');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${IMGBB_ENDPOINT}?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`ImgBB upload failed (${response.status}): ${errText || response.statusText}`);
  }

  const json = await response.json();
  if (!json?.success || !json?.data?.url) {
    throw new Error(json?.error?.message || 'ImgBB upload returned an invalid response.');
  }

  return {
    url: json.data.display_url || json.data.url,
    displayUrl: json.data.display_url || json.data.url,
    thumbUrl: json.data.thumb?.url,
    deleteUrl: json.data.delete_url,
  };
}
