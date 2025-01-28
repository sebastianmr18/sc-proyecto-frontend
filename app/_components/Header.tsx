"use client"
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Home, Settings, Activity, UserRoundCog } from 'lucide-react';
import { useAuth } from '../_context/authContext';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  
  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPath = usePathname();
  const hideLoginRegisterButton = ['/login', '/register', '/not-registered'];
  const showLoginRegisterButton = !hideLoginRegisterButton.includes(currentPath);

  const handleNavigate = (path: any) => {
    router.push(path);
  };

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <header className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('/')}
            className="flex items-center space-x-2"
          >
            <Activity className={`w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              SportReserve
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              showLoginRegisterButton && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleNavigate('/login')}
                    className={`px-6 py-2 rounded-full transition-all ${
                      isScrolled 
                        ? 'text-gray-600 hover:text-blue-600' 
                        : 'text-gray-100 hover:text-white'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => handleNavigate('/register')}
                    className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
                  >
                    Registrarse
                  </button>
                </div>
              )
            ) : (
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  <User className="w-5 h-5" />
                  <span>¡Hola, {user?.first_name}!</span>
                </div>
              { user?.role === 'administrador' && 
                <button
                  onClick={() => handleNavigate('/admin')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all ${
                    isScrolled 
                      ? 'text-gray-600 bg-green-300 hover:text-white hover:bg-green-700 ' 
                      : 'text-white hover:bg-green-600 bg-green-500'
                  }`}
                >
                  <UserRoundCog className="w-4 h-4" />
                  <span>Administración</span>
                </button> }              
                <button
                  onClick={() => handleNavigate('/profile')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-blue-600' 
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 px-4">
            {!isAuthenticated ? (
              showLoginRegisterButton && (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => handleNavigate('/login')}
                    className="w-full px-4 py-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => handleNavigate('/register')}
                    className="w-full px-4 py-2 text-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Registrarse
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 px-4 py-2 text-gray-800">
                  <User className="w-5 h-5" />
                  <span>¡Hola, {user?.first_name}!</span>
                </div>
                <button
                  onClick={() => handleNavigate('/profile')}
                  className="w-full px-4 py-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Perfil</span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;