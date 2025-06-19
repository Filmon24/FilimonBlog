import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" style={{
                    color: "white",
                    background: "#f1356d",
                    borderRadius: "8px"
                }}  >New Blog</Link>
            </div>
            <img alt='icon' src='src/images/home.jpg' id='icon'></img>
        </nav>
    );
}

export default Navbar;