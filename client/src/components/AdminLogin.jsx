import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
// Kept for layout logic but we override the dark bg
import imgfolder from "./img/core-img/logo-small.png";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(['email']);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/admin/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          axios.defaults.headers.common['x-auth-token'] = response.data.token;
          
          alert('Login Successful!');
          window.location.href = "admin_home";
          setCookie('adminemail', email, { path: '/' , sameSite: 'strict' });
          setError('');
      } else {
        setError('Login failed. Please check your credentials.');
        alert('Login Unsuccessful!');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Invalid email or password. Please try again.');
      alert('Login Unsuccessful!');
    }
  };

  // Set body background for light theme
  React.useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => { document.body.style.backgroundColor = ''; }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <title>Admin Login - Master Control</title>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {/* Login Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
              
              {/* Brand Header */}
              <div className="text-center pt-5 pb-2 border-0">
                <div className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: '70px', height: '70px' }}>
                  <i className="fa fa-cogs fa-2x"></i>
                </div>
                <h3 className="fw-bold text-dark" style={{ letterSpacing: '-0.5px' }}>Admin Control Panel</h3>
                <p className="text-muted small">System Management Authentication</p>
              </div>

              <div className="card-body p-5 pt-3">
                
                {error && (
                  <div className="alert alert-danger py-2 small shadow-sm text-center mb-4">
                    <i className="fa fa-exclamation-circle me-2"></i>{error}
                  </div>
                )}

                <form onSubmit={handleLogin}> 
                  {/* Email Input */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-secondary small mb-1" htmlFor="email">Administrator Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-primary" style={{ borderRadius: '12px 0 0 12px' }}>
                        <i className="fa fa-envelope-o"></i>
                      </span>
                      <input 
                        className="form-control bg-light border-start-0 ps-0 form-control-lg" 
                        name="email" 
                        id="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        type="email" 
                        style={{ borderRadius: '0 12px 12px 0', fontSize: '15px' }}
                        placeholder="admin@system.gov" 
                        required 
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label fw-semibold text-secondary small mb-0" htmlFor="password">Admin Password</label>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-primary" style={{ borderRadius: '12px 0 0 12px' }}>
                        <i className="fa fa-lock"></i>
                      </span>
                      <input 
                        className="form-control bg-light border-start-0 border-end-0 ps-0 form-control-lg" 
                        name="password" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        type={showPassword ? "text" : "password"} 
                        style={{ fontSize: '15px' }}
                        placeholder="••••••••" 
                        required 
                      />
                      <button 
                        type="button" 
                        className="input-group-text bg-light border-start-0 text-muted" 
                        onClick={togglePasswordVisibility}
                        style={{ borderRadius: '0 12px 12px 0', cursor: 'pointer' }}
                      >
                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button className="btn btn-primary w-100 py-3 fw-bold text-uppercase rounded-3 shadow-sm hover-lift mt-2" style={{ borderRadius: '12px', fontSize: '15px' }} type="submit">
                    <i className="fa fa-sign-in me-2"></i> Authenticate
                  </button>
                </form>
              </div>

            </div>
            
            {/* Return Hub Link */}
            <div className="text-center mt-4">
              <Link to="/" className="text-muted text-decoration-none small hover-lift d-inline-block">
                <i className="fa fa-arrow-left me-1"></i> Return to Main Selection
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
