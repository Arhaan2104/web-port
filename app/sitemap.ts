import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arhaang.com';

  return [
    { url: baseUrl, lastModified: new Date() },
{ url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/work/ticvision`, lastModified: new Date() },
    { url: `${baseUrl}/work/coralehr`, lastModified: new Date() },
    { url: `${baseUrl}/work/studbud`, lastModified: new Date() },
  ];
}
