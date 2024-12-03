"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import '@/public/styles/header.css';

const Header = () => {
    const { isAuthenticated, user, logout} = useAuth();
    const pathname = usePathname();

    const hideLoginRegisterButton = ['/login', '/register', '/not-registered'];

    const showLoginRegisterButton = !hideLoginRegisterButton.includes(pathname);

    return (
        <div className="header-container">
            <header className="header">
                <div className="header-content">                
                    <Link href="/">
                        <h1 className="text-black text-3xl">My App Header</h1>
                    </Link>
                    <nav className='header-nav'>
                        <ul className="flex justify-end space-x-4">                  
                            {!isAuthenticated ? ( 
                                showLoginRegisterButton ? (
                                <>
                                    <li>
                                        <Link href="/register"
                                            className="nav-link">
                                            Register

                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/login"
                                            className="nav-link">
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
                                            className="nav-link">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/logout"
                                            className="nav-link"
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
        </div>

    );
}

export default Header;
