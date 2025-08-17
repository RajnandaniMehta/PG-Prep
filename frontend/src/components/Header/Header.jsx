import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets/imageExport';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // react-icons

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const status = async () => {
      try {
        const { data } = await axios.get('/api/users/status', { withCredentials: true });
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error('Error fetching login status', error);
      }
    };
    status();
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('/api/users/logout', { withCredentials: true });
      if (data.success) setIsLoggedIn(false);
      else setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const navItems = [
    { name: 'Home', slug: '/' },
    { name: 'Admin Panel', slug: '/admin' }
  ];

  if (!isLoggedIn) {
    navItems.push({ name: 'Login', slug: '/login' });
  } else {
    navItems.push({ name: 'Logout', slug: '/logout' });
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-sky-700 to-gray-800 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md object-cover border-2 border-white"
          />
          <span className="font-bold text-xl sm:text-2xl tracking-wide">PG Prep</span>
        </div>

        {/* Hamburger Menu for small devices */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>

        {/* Navigation Links for medium and large devices */}
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 text-base lg:text-lg">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() =>
                  item.name === 'Logout' ? handleLogout() : navigate(item.slug)
                }
                className="px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-white/20 transition duration-300"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-sky-800 text-white shadow-lg">
          <ul className="flex flex-col items-center py-4 space-y-3 text-lg">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    if (item.name === 'Logout') handleLogout();
                    else navigate(item.slug);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
