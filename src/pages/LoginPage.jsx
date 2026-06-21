import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import '../styles/login.css'

function LoginPage() {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit= async event  => {
    event.preventDefault();
    
    const userData = {
      email: email,
      password: password
    };

    const url="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"

    const options= {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
       

      if (response.ok) {
        
        Cookies.set('jwt_token', data.data.token);
        console.log(data);
        navigate('/');
      } else {
        
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while trying to log in.');
    }
  }
  return(
  <form onSubmit={handleSubmit} className="login-form">
    <h1 className="login-title">Go Business</h1>
    <p>Sign in to open your referral dashboard.</p>
    <label htmlFor="email" className="login-label">Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      placeholder="you@example.com" 
      className="login-input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <label htmlFor="password" className="login-label">Password</label>
    <input 
      type="password" 
      id="password" 
      className='login-input'
      name="password" 
      placeholder="Enter your password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit" className="login-button">Sign in</button>
    {error && <span className="login-error">{error}</span>}
  </form>
)
}
export default LoginPage