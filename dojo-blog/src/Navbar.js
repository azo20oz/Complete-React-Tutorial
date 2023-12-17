import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HAIVE</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#5d7ce3',
          borderRadius: '8px' 
        }}>New Form</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;