// app/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-[#0097A7] p-4 shadow-lg mt-auto">
        <p className="text-[#212121] text-center">
          © {new Date().getFullYear()} My App. All rights reserved. Made with ❤️ by Sebastian Muñoz(@sebastianmr18).
        </p>
      </footer>
    );
  }
  