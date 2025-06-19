import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The My Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" className="new-blog-btn">New Blog</Link>
            </div>
            <img src={process.env.PUBLIC_URL + '/blog logo.png'} alt='Blog Logo' className='blog-logo' />
        </nav>
    );
}

export default Navbar;