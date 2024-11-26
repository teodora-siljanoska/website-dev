import { Maybe, UploadFileEntityResponse } from './types';

const URI = process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337';
// type Quality = 'large' | 'medium' | 'small' | 'thumbnail' | '';

const findMediaUrl = (
  media: Maybe<UploadFileEntityResponse> | undefined
): string | undefined => {
  let finalPath: string | undefined = '';
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    finalPath = `${URI}${media?.data?.attributes?.url}`;
    if (finalPath.includes('undefined')) {
      throw new Error('Contains undefined');
    }
  } catch {
    finalPath = undefined;
  }
  return finalPath;
};

export default findMediaUrl;
