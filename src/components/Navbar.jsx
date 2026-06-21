import {useNavigate,Link} from  'react-router-dom'
import Cookies from 'js-cookie'


function Navbar() {
const navigate = useNavigate();

    return (
        <div>
            <Link to="/">Go Business</Link>
            <button type="button">Try for free</button>
            <button type="button" onClick={() => {
                Cookies.remove('jwt_token');
                navigate('/login');
            }}>
                Log out
            </button>
        </div>
    )
}

export default Navbar;