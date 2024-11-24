/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000', // Asegúrate de incluir el puerto si es necesario
          pathname: '/media/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  