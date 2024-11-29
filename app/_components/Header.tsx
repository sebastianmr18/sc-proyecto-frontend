"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';

const Header = () => {
    const { isAuthenticated, user, logout} = useAuth();
    const pathname = usePathname();

    const hideLoginRegisterButton = ['/login', '/register']

    const showLoginRegisterButton = !hideLoginRegisterButton.includes(pathname);

    return (
        <div className="sticky w-full bg-[#0097A7] p-4 py-2.5 top-0">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-black text-3xl">My App Header</h1>
                </Link>
                <div>
                    <ul className="flex justify-end space-x-4">                  
                        {!isAuthenticated ? ( 
                            showLoginRegisterButton ? (
                            <>
                                <li>
                                    <Link href="/register"
                                        className="bg-[#00e2ea] text-[#023f4a] py-2 px-4 rounded hover:bg-[#00b3c4] active:bg-[#0097a7] transition duration-200">
                                        Register

                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login"
                                        className="bg-[#00e2ea] text-[#023f4a] py-2 px-4 rounded hover:bg-[#00b3c4] active:bg-[#0097a7] transition duration-200">
                                        Login
                                    </Link>
                                </li>      
                            </>
                            ) : null                  
                        ) : (
                            <>
                                <span>Welcome! {user?.first_name}</span>
                                <li>
                                    <Link href="/profile"
                                        className="bg-[#00e2ea] text-[#023f4a] py-2 px-4 rounded hover:bg-[#00b3c4] active:bg-[#0097a7] transition duration-200">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/logout"
                                        className="bg-[#00e2ea] text-[#023f4a] py-2 px-4 rounded hover:bg-[#00b3c4] active:bg-[#0097a7] transition duration-200"
                                        onClick={logout}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Header;
