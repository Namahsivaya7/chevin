import { CN_THUMBNAIL_CONF, IMAGE_CDN_ROOT } from "./config";

export const getImage = (path) => `${IMAGE_CDN_ROOT}${path}`;
export const getThumbnail = (path) =>
  `${IMAGE_CDN_ROOT}${CN_THUMBNAIL_CONF}/${path}`;