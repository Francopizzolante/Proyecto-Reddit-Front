import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onBackToHome, onForgotPasswordClick }) {
  // Estados para almacenar el nombre de usuario y la contraseña ingresados por el usuario.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el intento de inicio de sesión.
  const handleLogin = () => {
    console.log("Intentando iniciar sesión con:", username, password);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="text-center">
        <button onClick={onBackToHome} className="btn btn-danger btn-block" style={{ position: 'absolute', top: 20, left: 20 }}>Volver al inicio</button>
        <img src="Logo.png" alt="Logo" className="mb-4" />
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">Ingresar</button>
        </form>
        <button className="btn btn-link" onClick={onForgotPasswordClick}>¿Olvidaste tu contraseña?</button>
      </div>
    </div>
  );
}

export default Login;