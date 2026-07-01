export const getOptimizedUrl = (url, type = 'catalog') => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const baseUrlParts = url.split('/upload/');
  if (baseUrlParts.length !== 2) return url;
  
  const rest = baseUrlParts[1];
  let publicIdPart = rest;
  
  // Extract everything from 'v' (version) onwards, skipping the transformation string
  const vMatch = rest.match(/v\d+\//);
  if (vMatch) {
    publicIdPart = rest.substring(rest.indexOf(vMatch[0]));
  } else {
    // If no version string, skip the first part if it looks like a transformation
    const parts = rest.split('/');
    if (parts[0].includes('q_') || parts[0].includes('w_') || parts[0].includes('c_') || parts[0].includes('f_')) {
      publicIdPart = parts.slice(1).join('/');
    }
  }

  let transform = '';
  switch (type) {
    case 'catalog':
      // Каталог: 600x750, f_auto, q_auto:good, crop fill
      transform = 'c_fill,f_auto,h_750,q_auto:good,w_600';
      break;
    case 'details':
      // Деталі: 1200x1500, f_auto, q_auto:good, crop fill (для ефекту лупи)
      transform = 'c_fill,f_auto,h_1500,q_auto:good,w_1200';
      break;
    case 'banner':
      // Банери: ширина до 1920, f_auto, q_auto:good
      transform = 'c_limit,f_auto,q_auto:good,w_1920';
      break;
    case 'thumbnail':
      // Мініатюри в кошику: 120x150
      transform = 'c_fill,f_auto,h_150,q_auto:good,w_120';
      break;
    case 'category':
      // Категорії: 600x750
      transform = 'c_fill,f_auto,h_750,q_auto:good,w_600';
      break;
    default:
      transform = 'f_auto,q_auto:good';
  }

  return `${baseUrlParts[0]}/upload/${transform}/${publicIdPart}`;
};
