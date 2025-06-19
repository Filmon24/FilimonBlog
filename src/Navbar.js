import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" className="new-blog-btn">New Blog</Link>
            </div>
            <img src='src/images/home.jpg' alt='icon' id='icon'></img>
        </nav>
    );
}

export default Navbar;