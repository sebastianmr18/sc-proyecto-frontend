// app/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-[#3a590e] p-4 shadow-lg mt-auto">
        <p className="text-white text-center">
          © {new Date().getFullYear()} My App. All rights reserved. Made with ❤️ by Sebastian Muñoz(@sebastianmr18).
        </p>
      </footer>
    );
  }
  