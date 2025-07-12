export const white_pic =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
const zlib_cover_prefix = 'zlib://';

export function getCoverImageUrl(cover: string | undefined) {
  if (cover == undefined || cover.length == 0) {
    return white_pic;
  } else if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover;
  } else {
    if (cover.startsWith(zlib_cover_prefix)) {
      return cover.replace(zlib_cover_prefix, import.meta.env.VITE_COVER_ZLIBRARY_URL);
    }
    return import.meta.env.VITE_COVER_LIBGEN_URL + cover;
  }
}

export function getMd5CoverImageUrl(md5: string | undefined) {
  if (md5 == undefined || md5.length != 32) {
    return white_pic;
  } else {
    md5 = md5.toLowerCase();
    let path = '/covers/books/';
    for (let i = 0; i < 3; i++) {
      path += md5.substring(i * 2, i * 2 + 2) + '/';
    }
    path += md5 + '.jpg';
    return import.meta.env.VITE_COVER_ZLIBRARY_URL + path;
  }
}

/**
 * 根据ISBN获取Open Library的封面图片URL
 * @param isbn 书籍的ISBN号，可能是单个ISBN或逗号分隔的多个ISBN
 * @param size 图片尺寸：S(小)、M(中)、L(大)，默认为M
 * @returns 封面图片的URL
 */
export function getIsbnCoverImageUrl(isbn: string | undefined, size: 'S' | 'M' | 'L' = 'M') {
  if (isbn == undefined || isbn.length == 0) {
    return white_pic;
  } else {
    // 如果包含逗号，取第一个ISBN
    if (isbn.includes(',')) {
      isbn = isbn.split(',')[0].trim();
      
      // 如果分割后的ISBN为空，返回白色图片
      if (isbn.length == 0) {
        return white_pic;
      }
    }
    
    // 移除ISBN中的连字符
    isbn = isbn.replace(/-/g, '');
    return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
  }
}
