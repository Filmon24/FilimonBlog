import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuToggle = () => setMenuOpen(!menuOpen);
    return (
        <nav className="navbar">
            <h1>The My Blog</h1>
            <button className="hamburger" onClick={handleMenuToggle} aria-label="Toggle menu">
                <span className={menuOpen ? 'bar open' : 'bar'}></span>
                <span className={menuOpen ? 'bar open' : 'bar'}></span>
                <span className={menuOpen ? 'bar open' : 'bar'}></span>
            </button>
            <div className={`links${menuOpen ? ' open' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/create" className="new-blog-btn">New Blog</Link>
            </div>
            <img src={process.env.PUBLIC_URL + '/blog logo.png'} alt='Blog Logo' className='blog-logo' />
        </nav>
    );
}

export default Navbar;