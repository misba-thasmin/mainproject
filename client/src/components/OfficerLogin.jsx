import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
// We don't need the logo-white.png anymore as we are on a light theme
import imgfolder from "./img/core-img/logo-small.png";

const OfficerLogin = () => {
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
      const response = await axios.post('http://localhost:4000/api/v1/officer/login', {
        email: email.toLowerCase(),
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['x-auth-token'] = response.data.token;
        
        alert('Login Successful!');
        window.location.href = "officer_home";
        
        setCookie('officeremail', email, { path: '/', sameSite: 'strict' });
        setCookie('officerLocation', response.data.officerLocation, { path: '/', sameSite: 'strict' });
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
      <title>Officer Login - Child Safety Portal</title>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {/* Login Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
              
              <div className="card-body p-5">
                {/* Logo & Header */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex justify-content-center align-items-center bg-success bg-opacity-10 text-success rounded-circle mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-shield fa-2x"></i>
                  </div>
                  <h3 className="fw-bold text-dark" style={{ letterSpacing: '-0.5px' }}>Officer Portal</h3>
                  <p className="text-muted small">Investigation & Control Access</p>
                </div>

                {error && <div className="alert alert-danger py-2 small"><i className="fa fa-exclamation-circle me-1"></i>{error}</div>}

                {/* Form */}
                <form onSubmit={handleLogin}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-secondary small mb-1">Official Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-success" style={{ borderRadius: '12px 0 0 12px' }}>
                        <i className="fa fa-envelope-o"></i>
                      </span>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control bg-light border-start-0 ps-0 form-control-lg" 
                        style={{ borderRadius: '0 12px 12px 0', fontSize: '15px' }}
                        value={email}    
                        onChange={handleEmailChange}  
                        placeholder="officer@example.gov"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-secondary small mb-1">Secure Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-success" style={{ borderRadius: '12px 0 0 12px' }}>
                        <i className="fa fa-lock"></i>
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" 
                        className="form-control bg-light border-start-0 border-end-0 ps-0 form-control-lg" 
                        style={{ fontSize: '15px' }}
                        value={password} 
                        onChange={handlePasswordChange} 
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
                  <button type="submit" className="btn btn-success btn-lg w-100 mb-4 hover-lift shadow-sm" style={{ borderRadius: '12px', fontWeight: 'bold', padding: '12px' }}>
                    Access Official Dashboard
                  </button>
                </form>

              </div>
            </div>
            
            {/* Return Hub Link */}
            <div className="text-center mt-4">
              <Link to="/" className="text-muted text-decoration-none small hover-lift d-inline-block">
                <i className="fa fa-arrow-left me-1"></i> Back to Main Selection
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerLogin;
