/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Ή το ακριβές hostname του Supabase project σας
      },
      // Αν χρησιμοποιείτε Unsplash ή άλλα external domains για δοκιμή:
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;