import {useNavigate,Link} from  'react-router-dom'
import Cookies from 'js-cookie'
import './navbar.css'


function Navbar() {
const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <Link to="/" className="navbar-brand">
                Go Business
            </Link>
            <div className="navbar-buttons">
            <button type="button" className="navbar-button">
                Try for free
            </button>
            <button type="button" className="navbar-button" onClick={() => {
                Cookies.remove('jwt_token');
                navigate('/login');
            }}>
                Log out
            </button>
            </div>
        </div>
    )
}

export default Navbar;