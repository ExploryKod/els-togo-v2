import { projectId, dataset } from './api';

/**
 * Helper function to generate Sanity image URLs
 */
export function getSanityImageUrl(
  imageRef: string,
  width?: number,
  height?: number
): string {
  if (!imageRef) {
    return "";
  }

  try {
    // Extract the image ID from the reference
    // Format: image-{id}-{width}x{height}-{format}
    const imageId = imageRef.replace('image-', '').replace(/-jpg$/, '').replace(/-png$/, '').replace(/-webp$/, '');
    
    // Determine file extension
    let extension = 'jpg';
    if (imageRef.includes('-png')) extension = 'png';
    if (imageRef.includes('-webp')) extension = 'webp';
    
    // Build the URL
    let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}.${extension}`;
    
    // Add size parameters if provided
    if (width || height) {
      const params = new URLSearchParams();
      if (width) params.append('w', width.toString());
      if (height) params.append('h', height.toString());
      url += `?${params.toString()}`;
    }
    
    return url;
  } catch (error) {
    return "";
  }
}
