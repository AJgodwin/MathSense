import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

/**
 * Navbar - Functional component using useState, JSX, and event handling.
 * Demonstrates: React Router NavLink, conditional rendering for mobile menu.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleTrackerClick = () => {
    document.dispatchEvent(new Event('toggle-interaction-tracker'));
    closeMenu();
  };

  const navLinks = [
    { path: '/', label: '🏠 Home' },
    { path: '/product', label: '📋 About' },
    { path: '/learn', label: '🧩 Learn' },
    { path: '/visualization', label: '📊 Visuals' },
    { path: '/team', label: '👥 Team' },
    { path: '/course', label: '🎓 Course' },
    { path: '#tracker', label: '🧪 Tracker (Ctrl+I)' },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">🌿</span>
          <span className="brand-text">MathSense</span>
        </NavLink>

        {/* Hamburger button - event handling & conditional rendering */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Nav links - array mapping */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            link.path === '#tracker' ? (
              <button
                key={link.path}
                type="button"
                className="nav-link tracker-link"
                onClick={handleTrackerClick}
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
                onClick={closeMenu}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
