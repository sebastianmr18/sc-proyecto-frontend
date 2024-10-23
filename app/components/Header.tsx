import Link from 'next/link';

// app/components/Header.tsx
export default function Header() {
    return (
        <header className="bg-[#d2ff72] p-4 shadow-lg">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-black text-3xl">My App Header</h1>
                </Link>
                <nav>
                    <ul className="flex justify-end space-x-4">
                        <li>
                            <Link href="/about" className="text-black hover:text-gray-700">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/register" // Esto debería ser así
                                className="bg-[#91dd05] text-[#1c3201] py-2 px-4 rounded hover:bg-[#6fb100] active:bg-[#548605] transition duration-200">
                                Register

                            </Link>
                        </li>
                        <li>
                            <Link href="/login" 
                                className="bg-[#91dd05] text-[#1c3201] py-2 px-4 rounded hover:bg-[#6fb100] active:bg-[#548605] transition duration-200">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}
