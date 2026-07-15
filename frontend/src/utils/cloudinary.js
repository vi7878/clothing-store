/**
 * Cloudinary image optimization utilities with responsive support.
 * Generates srcSet and sizes for optimal image loading across all devices.
 */

/**
 * Parse a Cloudinary URL to extract the base URL and public ID,
 * stripping any existing transformation parameters.
 */
const parseCloudinaryUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;

  const baseUrlParts = url.split('/upload/');
  if (baseUrlParts.length !== 2) return null;

  const rest = baseUrlParts[1];
  let publicId = rest;

  // Extract everything from 'v' (version) onwards, skipping the transformation string
  const vMatch = rest.match(/v\d+\//);
  if (vMatch) {
    publicId = rest.substring(rest.indexOf(vMatch[0]));
  } else {
    // If no version string, skip the first part if it looks like a transformation
    const parts = rest.split('/');
    if (
      parts[0].includes('q_') ||
      parts[0].includes('w_') ||
      parts[0].includes('c_') ||
      parts[0].includes('f_')
    ) {
      publicId = parts.slice(1).join('/');
    }
  }

  return { baseUrl: baseUrlParts[0], publicId };
};

/**
 * Build a Cloudinary URL from base URL, transform string, and public ID.
 */
const buildUrl = (baseUrl, transform, publicId) =>
  `${baseUrl}/upload/${transform}/${publicId}`;

/**
 * Responsive image configuration per usage type.
 * Each type defines width variants for srcSet generation
 * and a function to build the corresponding transformation string.
 *
 * Quality levels:
 *   - q_auto:eco  → catalog cards & thumbnails (smaller, visually fine at small sizes)
 *   - q_auto:good → detail views, banners, categories (higher quality where it matters)
 */
const RESPONSIVE_CONFIGS = {
  catalog: {
    widths: [300, 400, 600],
    transform: (w) => `c_fill,f_auto,h_${Math.round(w * 1.25)},q_auto:eco,w_${w}`,
    // Mobile: 2 columns → ~50vw, tablet: 3 cols → ~33vw, desktop: 4 cols → ~25vw
    sizes: '(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw',
  },
  details: {
    widths: [600, 800, 1200],
    transform: (w) => `c_fill,f_auto,h_${Math.round(w * 1.25)},q_auto:good,w_${w}`,
    sizes: '(max-width: 768px) 100vw, 60vw',
  },
  banner: {
    widths: [768, 1200, 1920],
    transform: (w) => `c_limit,f_auto,q_auto:good,w_${w}`,
    sizes: '100vw',
  },
  thumbnail: {
    widths: [120],
    transform: () => 'c_fill,f_auto,h_150,q_auto:eco,w_120',
    sizes: '120px',
  },
  category: {
    widths: [300, 400, 600],
    transform: (w) => `c_fill,f_auto,h_${Math.round(w * 1.25)},q_auto:good,w_${w}`,
    // Mobile: 1 col → 100vw, tablet: 2 cols → 50vw, desktop: 4 cols → 25vw
    sizes: '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw',
  },
};

/**
 * Get an optimized Cloudinary URL for a specific type.
 * Returns the largest width variant as a single URL string.
 * Backward-compatible with existing code.
 */
export const getOptimizedUrl = (url, type = 'catalog') => {
  const parsed = parseCloudinaryUrl(url);
  if (!parsed) return url;

  const config = RESPONSIVE_CONFIGS[type] || RESPONSIVE_CONFIGS.catalog;
  const maxWidth = config.widths[config.widths.length - 1];

  return buildUrl(parsed.baseUrl, config.transform(maxWidth), parsed.publicId);
};

/**
 * Get responsive image props (src, srcSet, sizes) for an <img> element.
 * The browser will automatically select the optimal image size based on
 * viewport width and device pixel ratio.
 *
 * Usage:
 *   const imgProps = getResponsiveImageProps(url, 'catalog');
 *   <img {...imgProps} alt="..." loading="lazy" />
 */
export const getResponsiveImageProps = (url, type = 'catalog') => {
  const parsed = parseCloudinaryUrl(url);
  if (!parsed) return { src: url };

  const config = RESPONSIVE_CONFIGS[type] || RESPONSIVE_CONFIGS.catalog;
  const { baseUrl, publicId } = parsed;

  const srcSet = config.widths
    .map((w) => `${buildUrl(baseUrl, config.transform(w), publicId)} ${w}w`)
    .join(', ');

  const src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return { src, srcSet, sizes: config.sizes };
};
