import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Hàm kiểm tra email hợp lệ
  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Hàm đăng ký người dùng
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isEmailValid(email)) {
      setError('Email không hợp lệ!');
      return;
    }

    // Nếu tất cả hợp lệ, đăng ký người dùng
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Đăng ký thành công!');
      setTimeout(() => {
        navigate('/home'); // Chuyển hướng đến trang Home sau khi đăng ký thành công
      }, 2000);
    } catch (err) {
      setError('Lỗi đăng ký: ' + err.message);
    }
  };

  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
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
    rePasswordContainer: {
        position: 'relative',
        width: '100%',
        marginTop: '15px'
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
    checkboxLabel: {
      fontSize: '14px',
      marginBottom: '20px',
      marginTop: '20px',
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
    successText: {
      color: 'green',
      marginBottom: '15px',
    },
    errorText: {
      color: 'red',
      marginBottom: '15px',
    },
    loginText: {
      fontSize: '14px',
      marginTop: '20px',
      textAlign: 'center',
    },
    loginLink: {
      fontWeight: 'bold',
      color: '#007bff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Đăng ký</h2>
      <p>Đăng ký tài khoản để bắt đầu sử dụng Vietsocial</p>

      {error && <p style={styles.errorText}>{error}</p>}
      {successMessage && <p style={styles.successText}>{successMessage}</p>}

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

      {/* Input Xác nhận mật khẩu */}
      <div style={styles.rePasswordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.passwordInput}
        />
      </div>

      {/* Checkbox Duy trì trạng thái đăng nhập */}
      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={agree}
          onChange={handleCheckboxChange}
        />
        Duy trì trạng thái đăng nhập của tôi
      </label>

      {/* Button Đăng ký */}
      <button
        style={styles.loginButton}
        onClick={handleRegister}
        disabled={!agree || !email || !password || !confirmPassword}
      >
        Đăng ký
      </button>

      {/* Điều khoản sử dụng */}
      <p style={styles.terms}>
        Khi nhấp vào Đăng ký, bạn đồng ý với{' '}
        <span style={styles.link}>Thỏa thuận người dùng</span>,{' '}
        <span style={styles.link}>Chính sách quyền riêng tư</span> và{' '}
        <span style={styles.link}>Chính sách cookie</span> của Vietsocial.
      </p>

      {/* Đoạn text Đăng nhập ngay */}
      <p style={styles.loginText}>
        Đã có tài khoản?{' '}
        <span
          style={styles.loginLink}
          onClick={handleLoginRedirect}
        >
          Đăng nhập ngay!
        </span>
      </p>
    </div>
  );
};

export default Register;
