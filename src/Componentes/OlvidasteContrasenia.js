import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function OlvidasteContrasenia({ onBackToHome }) {
  // Estado para almacenar el correo electrónico ingresado por el usuario.
  const [email, setEmail] = useState('');

  // Función para manejar el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Se ha enviado el enlace de restablecimiento a:", email);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#000', color: '#fff' }}>
      <img src="Logo.png" alt="Logo" className="mb-4" />
      <div className="container mt-5">
        <button onClick={onBackToHome} className="btn btn-danger btn-block" style={{ position: 'absolute', top: 20, left: 20 }}>Volver al inicio</button>
        <h2>Recuperar Contraseña</h2>
        <p>Por favor, ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Enviar enlace</button>
        </form>
      </div>
    </div>
  );
}

export default OlvidasteContrasenia;