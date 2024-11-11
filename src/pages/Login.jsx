import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Email đặt lại mật khẩu đã được gửi!');
      } catch (err) {
        setError('Không thể gửi email đặt lại mật khẩu');
      }
    } else {
      alert('Vui lòng nhập email để đặt lại mật khẩu');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '350px',
      margin: 'auto',
      marginTop: '10vh',
    },
    inputField: {
      width: '100%',
      padding: '10px 15px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxSizing: 'border-box', 
    },
    passwordContainer: {
      position: 'relative',
      width: '100%',
    },
    passwordInput: {
      width: '100%',
      padding: '10px 45px 10px 15px', 
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxSizing: 'border-box',
    },
    passwordToggle: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#007bff',
    },
    forgotPassword: {
      color: '#007bff',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'background-color 0.3s',
    },
    terms: {
      fontSize: '12px',
      textAlign: 'center',
    },
    link: {
      fontWeight: 'bold',
      color: '#007bff',
      cursor: 'pointer',
    },
    registerText: {
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '20px',
    },
    registerLink: {
      fontWeight: 'bold',
      color: '#007bff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Đăng nhập</h1>
      <p>Luôn cập nhật trạng thái mỗi ngày</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Input Email */}
      <input
        type="email"
        placeholder="Email hoặc điện thoại"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.inputField}
      />

      {/* Input Mật khẩu */}
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.passwordInput}
        />
        <span
          style={styles.passwordToggle}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Ẩn' : 'Hiển thị'}
        </span>
      </div>

      {/* Quên mật khẩu */}
      <p style={styles.forgotPassword} onClick={handleForgotPassword}>
        Quên mật khẩu?
      </p>

      {/* Button Đăng nhập */}
      <button style={styles.loginButton} onClick={handleLogin}>
        Đăng nhập
      </button>

      {/* Điều khoản sử dụng */}
      <p style={styles.terms}>
        Khi nhấp vào Tiếp tục, bạn đồng ý với{' '}
        <span style={styles.link}>Thỏa thuận người dùng</span>,{' '}
        <span style={styles.link}>Chính sách quyền riêng tư</span> và{' '}
        <span style={styles.link}>Chính sách cookie</span> của Vietsocial.
      </p>

      {/* Đoạn text Chưa có tài khoản, Đăng ký ngay! */}
      <p style={styles.registerText}>
        Chưa có tài khoản?{' '}
        <span style={styles.registerLink} onClick={handleRegisterRedirect}>
          Đăng ký ngay!
        </span>
      </p>
    </div>
  );
};

export default Login;
