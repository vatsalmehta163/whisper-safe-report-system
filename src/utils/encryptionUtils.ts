
// Simulated encryption utilities
export const generateEncryptionKey = (): string => {
  return 'AES-256-' + Math.random().toString(36).substr(2, 16).toUpperCase();
};

export const simulateEncryption = (data: string): string => {
  // Base64 encode to simulate encryption (in real app, use proper encryption)
  return btoa(data);
};

export const simulateDecryption = (encryptedData: string): string => {
  // Base64 decode to simulate decryption
  try {
    return atob(encryptedData);
  } catch {
    return 'Decryption failed';
  }
};

export const generateReportId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 6);
  return `WP-${timestamp}-${random}`.toUpperCase();
};

export const hashIP = (ip: string): string => {
  // Simple hash simulation (in real app, use proper hashing)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
};
