export const formatFileSize = (bytes: string | number | undefined): string => {
  if (bytes === undefined || bytes === null || bytes === '') {
    return '';
  }

  let numBytes: number;

  if (typeof bytes === 'string') {
    numBytes = parseFloat(bytes);
    if (isNaN(numBytes) || numBytes < 0) {
      return '';
    }
  } else if (typeof bytes === 'number') {
    if (isNaN(bytes) || bytes < 0 || !isFinite(bytes)) {
      return '';
    }
    numBytes = bytes;
  } else {
    return '';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = numBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2).replace(/\.?0+$/, '')} ${units[unitIndex]}`;
};

export const formatDate = (timestamp: number | string | undefined): string => {
  if (timestamp === undefined || timestamp === null || timestamp === '') {
    return '';
  }

  let date: Date;

  if (typeof timestamp === 'string') {
    // Try to parse as numeric string
    const numericValue = parseFloat(timestamp);
    if (!isNaN(numericValue) && isFinite(numericValue)) {
      // Detect if timestamp is in seconds (< 10^11) or milliseconds
      const normalizedTimestamp = numericValue < 1e11 ? numericValue * 1000 : numericValue;
      date = new Date(normalizedTimestamp);
    } else {
      date = new Date(timestamp);
    }
  } else if (typeof timestamp === 'number') {
    if (!isFinite(timestamp)) {
      return '';
    }
    // Detect if timestamp is in seconds (< 10^11) or milliseconds
    const normalizedTimestamp = timestamp < 1e11 ? timestamp * 1000 : timestamp;
    date = new Date(normalizedTimestamp);
  } else {
    return '';
  }

  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString();
};

export const isVideo = (filename: string): boolean => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return false;
  return ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'rmvb'].includes(ext);
};
