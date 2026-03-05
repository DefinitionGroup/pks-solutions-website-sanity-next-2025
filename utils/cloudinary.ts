type MediaType = 'image' | 'video';

type CloudinaryAssetLike =
  | {
      secure_url?: string | null;
      url?: string | null;
    }
  | null
  | undefined;

const VERSION_SEGMENT_REGEX = /^v\d+$/;
const TRANSFORMATION_SEGMENT_REGEX = /(^|,)[a-z]{1,4}_[^,]+/;
const WIDTH_TOKEN_REGEX = /^w_\d+$/;
const CROP_TOKEN_REGEX = /^c_[^,]+$/;

const isCloudinaryDeliveryUrl = (url: URL) =>
  url.hostname.endsWith('res.cloudinary.com') &&
  /\/(?:image|video)\/upload\//.test(url.pathname);

const normalizeWidth = (width?: number) => {
  if (!width || !Number.isFinite(width)) return undefined;
  return Math.max(1, Math.round(width));
};

const inferMediaType = (pathSegments: string[], uploadIndex: number): MediaType | undefined => {
  const resourceType = pathSegments[uploadIndex - 1];
  if (resourceType === 'image' || resourceType === 'video') {
    return resourceType;
  }
  return undefined;
};

const hasToken = (tokens: string[], token: string) =>
  tokens.some((existingToken) => existingToken === token || existingToken.startsWith(`${token}:`));

const looksLikeTransformationSegment = (segment: string) =>
  TRANSFORMATION_SEGMENT_REGEX.test(segment);

const getRequiredTokens = (mediaType: MediaType, width?: number) => {
  const tokens: string[] =
    mediaType === 'video'
      ? ['f_auto', 'q_auto:good', 'vc_auto']
      : ['f_auto', 'q_auto', 'dpr_auto'];

  const normalizedWidth = normalizeWidth(width);
  if (normalizedWidth) {
    tokens.push('c_limit', `w_${normalizedWidth}`);
  }

  return tokens;
};

const mergeTokens = (existingTokens: string[], requiredTokens: string[]) => {
  const merged = [...existingTokens];
  const hasWidth = existingTokens.some((token) => WIDTH_TOKEN_REGEX.test(token));
  const hasCrop = existingTokens.some((token) => CROP_TOKEN_REGEX.test(token));

  for (const requiredToken of requiredTokens) {
    if (requiredToken.startsWith('w_') && hasWidth) continue;
    if (requiredToken === 'c_limit' && hasCrop) continue;

    const baseToken = requiredToken.split(':')[0];
    if (!hasToken(merged, baseToken)) {
      merged.push(requiredToken);
    }
  }

  return merged;
};

export const optimizeCloudinaryUrl = (
  url: string | undefined | null,
  options: { mediaType?: MediaType; width?: number } = {},
) => {
  if (!url) return '';

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (!isCloudinaryDeliveryUrl(parsed)) return parsed.toString();

  const pathSegments = parsed.pathname.split('/').filter(Boolean);
  const uploadIndex = pathSegments.findIndex(
    (segment, index) => segment === 'upload' && ['image', 'video'].includes(pathSegments[index - 1]),
  );

  if (uploadIndex === -1) return parsed.toString();

  const mediaType = options.mediaType ?? inferMediaType(pathSegments, uploadIndex);
  if (!mediaType) return parsed.toString();

  const requiredTokens = getRequiredTokens(mediaType, options.width);
  const transformationIndex = uploadIndex + 1;
  const segmentAfterUpload = pathSegments[transformationIndex];

  if (
    !segmentAfterUpload ||
    VERSION_SEGMENT_REGEX.test(segmentAfterUpload) ||
    !looksLikeTransformationSegment(segmentAfterUpload)
  ) {
    pathSegments.splice(transformationIndex, 0, requiredTokens.join(','));
  } else {
    const existingTokens = segmentAfterUpload.split(',').filter(Boolean);
    pathSegments[transformationIndex] = mergeTokens(existingTokens, requiredTokens).join(',');
  }

  parsed.pathname = `/${pathSegments.join('/')}`;
  return parsed.toString();
};

export const resolveCloudinaryAssetUrl = (asset?: CloudinaryAssetLike) => {
  if (!asset) return '';
  return asset.secure_url || asset.url || '';
};

export const getOptimizedCloudinaryImageUrl = (
  url: string | undefined | null,
  options: { width?: number } = {},
) => optimizeCloudinaryUrl(url, { mediaType: 'image', width: options.width });

export const getOptimizedCloudinaryVideoUrl = (
  url: string | undefined | null,
  options: { width?: number } = {},
) => optimizeCloudinaryUrl(url, { mediaType: 'video', width: options.width });
