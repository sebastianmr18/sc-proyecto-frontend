"use client";
import Link from 'next/link';
import { useAuth } from '@/app/_context/authContext';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    return (
        <header className="bg-[#d2ff72] p-4 shadow-lg">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-black text-3xl">My App Header</h1>
                </Link>
                <nav>
                    <ul className="flex justify-end space-x-4">                  
                        {!isAuthenticated ? ( 
                        <>
                            <li>
                                <Link href="/register"
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
                        </>
                        ) : (
                            <>
                                <span>Welcome! {user?.first_name}</span>
                                <li>
                                    <Link href="/profile" 
                                        className="bg-[#91dd05] text-[#1c3201] py-2 px-4 rounded hover:bg-[#6fb100] active:bg-[#548605] transition duration-200">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/logout" 
                                        className="bg-[#91dd05] text-[#1c3201] py-2 px-4 rounded hover:bg-[#6fb100] active:bg-[#548605] transition duration-200"
                                        onClick={logout}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>

    );
}

export default Header;
